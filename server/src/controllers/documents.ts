import { asyncHandler, upload } from "../middlewares"
import { Request, Response } from 'express';
import { deleteFile, uploadFile } from "../services";
import { prisma } from "../configs";
import { Users, Documents } from "@prisma/client";

export const addDocument = [upload.single("file"), async (req: Request, res: Response) => {
    try {

        const { file } = req;
        console.log(file)
        const user = req.user as Users;
        const { name } = req.body;


        if (!file) {
            res.status(405).json({ message: "Please upload a file!" });
            return;
        }

        const url = await uploadFile(file) as string;

        await prisma.documents.create({
            data: {
                name,
                path: url,
                usersId: user.id
            }
        })

        res.status(201).json({ message: "File uploaded successfully.", url });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error." });
    }
}];

export const getDocument = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    const documents = await prisma.documents.findMany({ where: { usersId: user.id } });
    res.status(200).json({ message: "Documents found!", documents })
});

export const changeVisibility = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    const document = await prisma.documents.findUnique({ where: { id } });

    if (!document) {
        res.status(404).json({ message: "Documents not found." });
        return;
    }

    await prisma.documents.update({ where: { id }, data: { visibility: !document.visibility } });

    res.status(200).json({ message: "Update visibility successfully." });

});

export const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const document = await prisma.documents.findUnique({ where: { id } });

    if (!document) {
        res.status(404).json({ message: "Document not found." });
        return;
    }

    await deleteFile(document.path);

    await deleteFile(document.path);
    await prisma.documents.delete({ where: { id: document.id } });

    res.status(200).json({ message: "Deleted successfully." });
});


export const getDocumentByUUID = asyncHandler(async (req: Request, res: Response) => {
    const { uuid } = req.params as { uuid: string };
    const documents = await prisma.documents.findMany({
        where: {
            user: { uuid }
        }
    });

    res.status(200).json({ message: "Documents found!", documents })
})