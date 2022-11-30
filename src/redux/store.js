import { configureStore } from '@reduxjs/toolkit';

import cartHandleSlice from './cartHandleSlice';
import accountSlice from './accountSlice';

const store = configureStore({
    reducer: {
        cartHandle: cartHandleSlice.reducer,
        account: accountSlice.reducer
    },
});

export default store;