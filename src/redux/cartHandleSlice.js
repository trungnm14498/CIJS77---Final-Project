import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'cartHandle',
    initialState: {
        addedItem: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.addedItem = [...state.addedItem, action.payload]
        },
        deleteItem: (state, action) => {
            const deleteId = state.addedItem.findIndex(item => item.id === action.payload);
            state.addedItem.splice(deleteId, 1);
        },
        deleteAllItems: (state, action) => {
            state.addedItem = state.addedItem.filter(item => item.id !== action.payload);
        }
    }
})

