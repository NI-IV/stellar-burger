import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNewOrder = createAsyncThunk(
  'newOrder/createNewOrder',
  orderBurgerApi
);
