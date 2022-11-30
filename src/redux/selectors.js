import { createSelector } from '@reduxjs/toolkit';

export const totalAmountSelector = (state) => state.cartHandle.totalAmount;

export const totalPriceSelector = (state) => state.cartHandle.totalPrice;

export const addedItemSelector = (state) => state.cartHandle.addedItem;

export const cartedItemsSelector = createSelector(addedItemSelector,
    (addedItem) => {
        return addedItem.filter((item) => item.amount > 0);
    }
)

export const selectItem = (state) => state.cartHandle.addedItem

export const selectItemWithId = (state, id) => state.cartHandle.addedItem.filter((item) => item.id === id)

export const selectItemTotal = (state) => state.cartHandle.addedItem.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)

export const isLoginedSelector = (state) => state.account.isLogined;

export const accountInfoSelector = (state) => state.account.info;
