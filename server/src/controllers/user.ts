import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandle.middleware";
import { prisma } from "../configs";
import { compareSync, hashSync } from "bcrypt";
import { deleteFile, getData, getToken, uploadFile } from "../services";
import { upload } from "../middlewares";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { password, uuid } = req.body as { uuid: string; password: string };

  if (await prisma.users.findUnique({ where: { uuid } })) {
    res.status(409).json({ message: "User already exists." });
    return;
  }

  const user = await prisma.users.create({
    data: {
      uuid,
      password: hashSync(password, 12),
    },
  });

  const token = getToken({ id: user.id });

  res.status(201).json({ message: "Account created successfully!", token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { uuid, password } = req.body as { uuid: string; password: string };

  const user = await prisma.users.findUnique({ where: { uuid } });

  if (!user) {
    res.status(404).json({ message: "User doesn't exists." });
    return;
  }

  if (compareSync(password, user.password)) {
    const token = getToken({ id: user.id });
    res.status(200).json({ message: "LoggedIn Successfully!", token });
    return;
  }

  res.status(401).json({ message: "Either UUID or password is incorrect." });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as { token: string };

  const data = getData(token) as { id: string } | null;
  console.log(token)
  if (!data) {
    res.status(401).json({ message: "Token is invalid or expired." });
    return;
  }

  const user = await prisma.users.findUnique({ where: { id: data.id } });
  res.status(200).json({ message: "User Found!", user });
});

export const updateInfo = [upload.single("file"), (async (req: Request, res: Response) => {
  const { id } = req.user;
  const { fullName, email } = req.body as { fullName: string; email: string };

  if (!req.file) {
    res.status(404).json({ message: "No ID found!" });
    return;
  }

  const url = await uploadFile(req.file);

  await prisma.users.update({
    where: { id },
    data: {
      fullName,
      email,
      iid: url as string,
    },
  });
  res.status(200).json({ message: "Updated successfully." });
})];

export const updateAvatar = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      // Check if user exists in request
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized request!" });
        return;
      }

      const { id, avatar } = req.user;

      // If user already has an avatar, delete the old file
      if (avatar) {
        try {
          await deleteFile(avatar);
        } catch (error) {
          console.error("Failed to delete old avatar:", error);
          res.status(500).json({ message: "Failed to delete old avatar" });
          return;
        }
      }

      // Ensure a file was uploaded
      if (!req.file) {
        res.status(400).json({ message: "No image received!" });
        return;
      }

      // Upload new file
      const url = await uploadFile(req.file);
      if (!url) {
        res.status(500).json({ message: "File upload failed!" });
        return;
      }

      // Update user's avatar in the database
      await prisma.users.update({
        where: { id },
        data: { avatar: url as string },
      });

      res
        .status(200)
        .json({ message: "Profile picture updated!", avatar: url });
    } catch (error) {
      console.error("Error updating avatar:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const block = asyncHandler(async (req: Request, res: Response) => {
  const { isBlocked } = req.body;
  const { id } = req.user;

  await prisma.users.update({ where: { id }, data: { isBlocked: !isBlocked } });
  res.status(200).json({ message: "User updated successfully!" });
});

export const getUserByUUID = asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };
  const user = await prisma.users.findUnique({ where: { uuid } });

  res.status(200).json({ message: "User found!", user });
})
