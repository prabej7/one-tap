import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { prisma } from '../configs';

export const getLogs = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user;
    const logs = await prisma.log.findMany({ where: { usersId: id } });
    res.status(200).json({ message: "Logs found!", logs })
});

export const deleteLog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    await prisma.log.delete({ where: { id } });
    res.status(200).json({ message: "Log deleted successfully!" });
});