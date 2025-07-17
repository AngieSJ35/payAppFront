// src/store/transactionSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transaction: null,
};

const transactionSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    saveTransaction: (state, action) => {
      state.transaction = action.payload;
      localStorage.setItem('payment', JSON.stringify(action.payload));
    },
  },
});

export const { saveTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;