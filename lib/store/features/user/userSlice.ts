import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  profileImage: string | null;
  name: string | null;
  mobileNo: string | null;
  profileVisibility: boolean;
  heading: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  pincode: string | null;
  starFriends: string[];
  blockedUsers: string[];
  interests: string[];
  myFriends: string[];
  notInterestedRecommendations: string[];
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  password: null,
  profileImage: null,
  name: null,
  mobileNo: null,
  profileVisibility: true, // Default to visible
  heading: null,
  bio: null,
  city: null,
  country: null,
  pincode: null,
  starFriends: [],
  blockedUsers: [],
  interests: [],
  myFriends: [],
  notInterestedRecommendations: [],
  role: "user", // Default role
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Step 1: Basic Signup Info
    setBasicInfo: (
      state,
      action: PayloadAction<{ username: string; email: string; password: string }>
    ) => {
      const { username, email, password } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
    },

    // Step 2: Additional Info
    setAdditionalInfo: (
      state,
      action: PayloadAction<{
        name?: string;
        mobileNo?: string;
        profileVisibility?: boolean;
        heading?: string;
        bio?: string;
        city?: string;
        country?: string;
        pincode?: string;
      }>
    ) => {
      const {
        name,
        mobileNo,
        profileVisibility,
        heading,
        bio,
        city,
        country,
        pincode,
      } = action.payload;
      if (name) state.name = name;
      if (mobileNo) state.mobileNo = mobileNo;
      if (profileVisibility !== undefined)
        state.profileVisibility = profileVisibility;
      if (heading) state.heading = heading;
      if (bio) state.bio = bio;
      if (city) state.city = city;
      if (country) state.country = country;
      if (pincode) state.pincode = pincode;
    },

    // Step 3: Additional Profile Details
    setProfileDetails: (
      state,
      action: PayloadAction<{
        profileImage?: string;
        starFriends?: string[];
        blockedUsers?: string[];
        interests?: string[];
        myFriends?: string[];
        notInterestedRecommendations?: string[];
        role?: string;
      }>
    ) => {
      const {
        profileImage,
        starFriends,
        blockedUsers,
        interests,
        myFriends,
        notInterestedRecommendations,
        role,
      } = action.payload;

      if (profileImage) state.profileImage = profileImage;
      if (starFriends) state.starFriends = starFriends;
      if (blockedUsers) state.blockedUsers = blockedUsers;
      if (interests) state.interests = interests;
      if (myFriends) state.myFriends = myFriends;
      if (notInterestedRecommendations)
        state.notInterestedRecommendations = notInterestedRecommendations;
      if (role) state.role = role;
    },

    // Logout
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setBasicInfo, setAdditionalInfo, setProfileDetails, logout } =
  userSlice.actions;

export default userSlice.reducer;
