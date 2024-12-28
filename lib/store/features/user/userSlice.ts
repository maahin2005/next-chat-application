import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null; // For profile pictures
    isAuthenticated: boolean; // To track authentication status
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; name: string; email: string; avatar: string }>) => {
            const { id, name, email, avatar } = action.payload;
            state.id = id;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.avatar = null;
            state.isAuthenticated = false;
        },
        updateProfile: (state, action: PayloadAction<{ name?: string; email?: string; avatar?: string }>) => {
            const { name, email, avatar } = action.payload;
            if (name) state.name = name;
            if (email) state.email = email;
            if (avatar) state.avatar = avatar;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateProfile } = userSlice.actions;

export default userSlice.reducer;
