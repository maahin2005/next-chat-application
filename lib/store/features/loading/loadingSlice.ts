import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  loading: boolean;
  error: boolean;
}

const initialState: LoginState = {
  loading: false,
  error: false,
};

export const loadingSlice = createSlice({
  name: "loding",
  initialState,
  reducers: {
    requestIntiated: (state) => {
      state.loading = true;
      state.error = false;
    },
    requestFullfilled: (state) => {
      state.loading = false;
      state.error = false;
    },
    requestRejected: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { requestIntiated, requestFullfilled, requestRejected } =
  loadingSlice.actions;

export default loadingSlice.reducer;
