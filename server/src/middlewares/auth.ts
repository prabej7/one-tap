import { prisma } from "../configs";
import { Request, Response, NextFunction } from 'express';
import { getData } from "../services";
import { Users } from "@prisma/client"
// Add this interface
declare global {
    namespace Express {
        interface Request {
            user: Users; // Or define a proper User type based on your prisma model
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            res.status(401).json({ message: "Access Denied. No token provided." });
            return;
        }

        const data = getData(token) as { id: string } | null;

        if (!data) {
            res.status(401).json({ message: "Invalid or expired token." });
            return
        }

        const user = await prisma.users.findUnique({ where: { id: data.id } });

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};
