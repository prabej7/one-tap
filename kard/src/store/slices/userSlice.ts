import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  uuid: string;
  fullName: string;
  email: string;
  isBlocked: boolean;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  iid: string;
}

const initialState: UserState = {
  id: "",
  createdAt: "",
  isBlocked: false,
  updatedAt: "",
  uuid: "",
  email: "",
  fullName: "",
  avatar: "",
  iid: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.uuid = action.payload.uuid;
      state.isBlocked = action.payload.isBlocked;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.iid = action.payload.iid;
    },
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
