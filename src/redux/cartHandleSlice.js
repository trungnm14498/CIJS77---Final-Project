import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'cartHandle',
    initialState: {
        billPrice: 0,
        orderTime: "",
        addedItem: [],
    },
    reducers: {
        // incrPrice: (state, action) => { state.totalPrice += action.payload },
        // decrPrice: (state, action) => { state.totalPrice -= action.payload },
        // incrAmount: (state) => { state.totalAmount += 1 },
        // decrAmount: (state) => { state.totalAmount -= 1 },
        // addItem: (state, action) => { state.addedItem.push(action.payload) },
        // incrAmountItem: (state, action) => {
        //     const currentItem = state.addedItem.find(item => item.id === action.payload);
        //     if (currentItem) {
        //         currentItem.amount += 1;
        //     }
        // },
        // decrAmountItem: (state, action) => {
        //     const currentItem = state.addedItem.find(item => item.id === action.payload);
        //     if (currentItem) {
        //         currentItem.amount -= 1;
        //     }
        // },
        addItem: (state, action) => {
            state.addedItem = [...state.addedItem, action.payload]
        },
        deleteItem: (state, action) => {
            const deleteId = state.addedItem.findIndex(item => item.id === action.payload);
            state.addedItem.splice(deleteId, 1);
        },
        deleteAllItems: (state, action) => {
            state.addedItem = state.addedItem.filter(item => item.id !== action.payload);
        },
        setBillPrice: (state, action) => {
            state.billPrice = action.payload;
        },
        setOrderTime: (state, action) => {
            state.orderTime = action.payload;
        }
    }
})

