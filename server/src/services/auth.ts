import { prisma } from "../configs";
import { getData } from "./jwt"
import { Request, Response } from 'express';

export const auth = async (req: Request, res: Response, token: string) => {
    try {
        const data = getData(token) as { id: string } | null;

        if (!data) {
            res.status(401).json({ message: "Access Denied." });
            return;
        }

        const user = await prisma.users.findUnique({ where: { id: data.id } });

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        return user;
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." });
    }

}