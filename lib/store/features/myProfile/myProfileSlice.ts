import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface myProfile {
  profileImage: string | null;
  username: string | null;
  name: string | null;
  bio: string | null;
  heading: string | null;
}

const initialState: myProfile = {
  profileImage: null,
  username: null,
  name: null,
  bio: null,
  heading: null,
};

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    addMyProfileData: (
      state,
      action: PayloadAction<{
        profileImage?: string | null;
        username?: string | null;
        name?: string | null;
        bio?: string | null;
        heading?: string | null;
      }>
    ) => {
      const { profileImage, username, name, bio, heading } = action.payload;
      if (username) state.username = username;
      if (profileImage) state.profileImage = profileImage;
      if (name) state.name = name;
      if (bio) state.bio = bio;
      if (heading) state.heading = heading;
    },
  },
});

export const { addMyProfileData } = myProfileSlice.actions;

export default myProfileSlice.reducer;
