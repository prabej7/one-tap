import { Request, Response } from "express"
import { asyncHandler } from "../middlewares"
import { prisma } from "../configs"

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const notifications = await prisma.notification.findMany({ where: { usersId: req.user.id } });
    res.status(200).json({ message: "Notifications found!", notifications });
});

export const seeNotification = asyncHandler(async (req: Request, res: Response) => {

    console.log(req.user.id)
    await prisma.notification.updateMany({
        where: { usersId: req.user.id }, data: {
            isSeen: true
        }
    });

    const notifications = await prisma.notification.findMany({ where: { usersId: req.user.id } });
    console.log(notifications)
    res.status(200).json({ message: "All messages seen." });
})

