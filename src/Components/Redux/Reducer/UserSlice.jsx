import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        logoutUser: (state) => {
            state.user = null,
                state.token = null
        },
    },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions
export default userSlice.reducer