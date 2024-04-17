import { getOrdersApi, getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllUserOrders = createAsyncThunk(
  'orders/getAllUserOrders',
  getOrdersApi
);
export const getAllFeeds = createAsyncThunk('orders/getAllFeeds', getFeedsApi);
