import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getAllFeeds } from './actions';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const reducer = feedsSlice.reducer;
export const { getFeeds, getTotal, getTotalToday } = feedsSlice.selectors;
