import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DocumentState {
    id: string;
    name: string;
    path: string;
    usersId: string;
    visibility: boolean;
    createdAt: string;
    updatedAt: string;
}

const initialState: DocumentState[] = [];

export const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setDocuments: (_, action: PayloadAction<DocumentState[]>) => {
            return action.payload
        }
    }
})

export const { setDocuments } = documentSlice.actions;

export default documentSlice.reducer;