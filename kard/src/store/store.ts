import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import documentReducer from "./slices/documentSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        documents: documentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch