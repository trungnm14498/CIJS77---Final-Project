import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "account",
    initialState: {
        isLogined: true,
        info: {
            role: "user",
            username: "trungnm14498",
            name: "Nguyen Manh Trung",
            dob: "14/04/1998",
            phone: "+79967978868",
            email: "trungnm14498@gmail.com",
            gender: "male",
            address: "An Khanh, Hoai Duc, Ha Noi",
            password: "14041998"
        }
    },
    reducers: {
        setLogout(state) {
            state.isLogined = false;
        },
        setLogin(state) {
            state.isLogined = true;
        }
    }
})