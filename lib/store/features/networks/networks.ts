import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface networks {
  myNetworks: object[];
}

const initialState: networks = {
  myNetworks: [],
};

const myNetworkSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    addMyNetworks: (state, action: PayloadAction<[object]>) => {
      state.myNetworks = action.payload;
    },
  },
});

export const { addMyNetworks } = myNetworkSlice.actions;

export default myNetworkSlice.reducer;
