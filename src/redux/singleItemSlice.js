import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'singleItem',
    initialState: {
        amount: 0,
        // status: false,
    },
    reducers: {
        addItem: (state) => { state.amount++ },
        subItem: (state) => { state.amount-- },
        // toggleButton: (state) => { state.status = !state.status }
    }
})