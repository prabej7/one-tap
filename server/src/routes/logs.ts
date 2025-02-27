import { Router } from "express";
import { auth } from "../middlewares";
import { deleteLog, getLogs } from "../controllers/logs";

const logsRouter = Router();

logsRouter
    .delete("/logs/:id", auth, deleteLog)
    .get("/logs/", auth, getLogs);

export default logsRouter;