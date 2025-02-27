interface Document {
    id: string;
    name: string;
    path: string;
    visibility: boolean;
    createdAt: string;
    updatedAt: string;
    usersId: string;
}

export { Document }