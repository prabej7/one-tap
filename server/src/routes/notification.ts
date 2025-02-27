import { Router } from "express";
import { auth } from "../middlewares";
import { getNotifications, seeNotification } from "../controllers/notification";

const notificationRouter = Router();

notificationRouter
    .get("/notification", auth, getNotifications)
    .patch("/notification", auth, seeNotification);

export default notificationRouter;