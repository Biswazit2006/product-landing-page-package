import { IUser } from "@/model/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser | null = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as IUser | null,
  reducers: {
    addUser: (_, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;