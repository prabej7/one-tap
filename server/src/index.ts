import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./routes";
import { prisma } from "./configs";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this based on your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

const socketUser: { [key: string]: string } = {};
// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("New Socket.IO connection", socket.id);

  socket.on("id", async (data) => {
    console.log("Client ID:", data.uuid)
    socketUser[data.uuid] = socket.id;
  });

  socket.on("scan", (message) => {
    console.log("Received:", message);
  });

  socket.on("accept", async (data) => {
    console.log("Accepted", data);
    io.to(socketUser[data.receiver]).emit("accept", { uuid: data.uuid });

    const user = await prisma.users.findUnique({ where: { uuid: data.uuid } });

    await prisma.log.create({
      data: {
        title: "Accepted",
        accessedBy: data.receiver,
        usersId: user?.id
      }
    })
  })

  socket.on("decline", async (data) => {
    console.log("Declined", data);
    io.to(socketUser[data.receiver]).emit("decline", { uuid: data.uuid });
    const user = await prisma.users.findUnique({ where: { uuid: data.uuid } });

    await prisma.log.create({
      data: {
        title: "Declined",
        accessedBy: data.receiver,
        usersId: user?.id
      }
    })
  })

  socket.on("disconnect", () => {
    // Find the user associated with this socket.id and delete it
    const userUUID = Object.keys(socketUser).find(
      (key) => socketUser[key] === socket.id
    );

    if (userUUID) {
      delete socketUser[userUUID];
      console.log(`User ${userUUID} disconnected and removed from socketUser.`);
    }
  });
});

// API Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Kard API!" });
});

app.post("/scan", async (req: Request, res: Response) => {
  const { uuid, sender } = req.body as { uuid: string, sender: string };
  console.log("Received Data:", req.body);
  console.log("Receiver:", socketUser[uuid]);

  if (!uuid.startsWith("B")) {
    res.status(200).json({ message: "Device plugged in!" });
    return
  }

  const user = await prisma.users.findUnique({ where: { uuid } });

  await prisma.log.create({
    data: {
      accessedBy: sender,
      title: "Requested",
      usersId: user?.id
    }
  })

  if (socketUser[uuid]) {
    io.to(socketUser[uuid]).emit("uuid", req.body);
  } else {
    const user = await prisma.users.findUnique({ where: { uuid } });

    await prisma.notification.create({
      data: {
        accessedBy: uuid,
        title: "Requested",
        usersId: user?.id
      }
    })
  }
  res.status(200).json({ message: "UUID sent to Socket.IO clients!" });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
