import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Reducer/UserSlice";


export const store = configureStore({
    reducer: {
        user: reducer
    }
})
