import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LogType {
    id: string;
    title: string;
    accessedBy: string;
    createdAt: string;
    updatedAt: string;
    usersId: string;
}

const initialState: LogType[] = []

export const logSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        setLogs: (state, action: PayloadAction<LogType[]>) => {
            return action.payload
        }
    }
})

export const { setLogs } = logSlice.actions;
export default logSlice.reducer;