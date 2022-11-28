import { createSelector } from '@reduxjs/toolkit';


export const totalAmountSelector = (state) => state.cartHandle.totalAmount;

export const totalPriceSelector = (state) => state.cartHandle.totalPrice;

export const singleAmountSelector = (state) => state.singleItem.amount;

export const statusItemSelector = (state) => state.singleItem.status;

export const addedItemSelector = (state) => state.cartHandle.addedItem;

export const cartedItemsSelector = createSelector(addedItemSelector,
    (addedItem) => {
        return addedItem.filter((item) => item.amount > 0);
    }
)

export const selectItem = (state) => state.cartHandle.addedItem

export const selectItemWithId = (state, id) => state.cartHandle.addedItem.filter((item) => item.id === id)

export const selectItemTotal = (state) => state.cartHandle.addedItem.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)

export const billPriceSelector = (state) => state.cartHandle.billPrice;

export const orderTimeSelector = (state) => state.cartHandle.orderTime;
