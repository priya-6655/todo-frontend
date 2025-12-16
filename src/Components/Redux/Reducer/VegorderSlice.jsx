import { createSlice } from "@reduxjs/toolkit";

const VegSlice = createSlice({
    name: 'vegUser',
    initialState: {
        user: null,
        token: null,
        loginStatus: 0,
    },
    reducers: {
        setUsr: (state, action) => {
            state.user = action.payload.user,
                state.token = action.payload.token,
                state.loginStatus = action.payload.loginStatus
        },
        updateUsr: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        logoutUsr: (state) => {
            state.user = null,
                state.token = null,
                state.loginStatus = 0
        }

    }

})

export const { setUsr, updateUsr, logoutUsr } = VegSlice.actions

export const vegUsrReducer = VegSlice.reducer