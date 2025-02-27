import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import documentReducer from './slices/documentSlice';
import logReducer from "./slices/logSlice";
import notificationReducer from "./slices/notificationSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        document: documentReducer,
        logs: logReducer,
        notification: notificationReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;