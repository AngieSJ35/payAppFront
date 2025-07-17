// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './transactionSlice';

export const store = configureStore({
  reducer: { payment: paymentReducer },
});