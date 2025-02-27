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
        set: (state, action: PayloadAction<DocumentState[]>) => {
            return action.payload
        }
    }
})

export const { set } = documentSlice.actions;

export default documentSlice.reducer;