import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getAllFeeds, getAllUserOrders } from './actions';

type TOrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  orderRequest: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  orderRequest: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(getAllUserOrders.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getAllFeeds.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const reducer = ordersSlice.reducer;
export const { getOrders, getTotal, getTotalToday, getOrderRequest } =
  ordersSlice.selectors;
