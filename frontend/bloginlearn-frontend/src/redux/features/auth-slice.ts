import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialize } from "next/dist/server/lib/render-server";

type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuthenticated: boolean,
  username: string,
  uid: string
}

export const initialState = {
  value: {
    isAuthenticated: false,
    username: "",
    uid: ""
  } as AuthState
} as InitialState;

export const auth = createSlice({
  name: "auth", 
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState
    },
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuthenticated: true, 
          username: action.payload,
          uid: "2131" //making dummy shit for now. 
        },
      }
    },
  }
})

export const {logIn, logOut} = auth.actions;
export default auth.reducer;