import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationType {
    id: string;
    title: string;
    accessedBy: string;
    isSeen: boolean;
    createdAt: string;
    updatedAt: string;
}

const initialState: NotificationType[] = [];

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
            return action.payload
        }
    }
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;