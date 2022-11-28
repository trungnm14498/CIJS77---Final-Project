import { configureStore } from '@reduxjs/toolkit';

import cartHandleSlice from './cartHandleSlice';
import singleItemSlice from './singleItemSlice';

const store = configureStore({
    reducer: {
        cartHandle: cartHandleSlice.reducer,
        // singleItem: singleItemSlice.reducer,
    },
});

export default store;