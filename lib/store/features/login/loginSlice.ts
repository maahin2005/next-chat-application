import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
