import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "account",
    initialState: {
        isLogined: false,
        info: {
        }
    },
    reducers: {
        setLogout: (state, action) => {
            state.isLogined = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogined = action.payload;
        },
        setUserIn: (state, action) => {
            state.info = action.payload;
        }
    }
})