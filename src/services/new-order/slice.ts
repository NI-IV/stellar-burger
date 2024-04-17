import { createSlice, isAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createNewOrder } from './actions';

type TNewOrderSlice = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

export const initialState: TNewOrderSlice = {
  order: null,
  name: '',
  orderRequest: false
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const reducer = newOrderSlice.reducer;
export const { getOrderRequest, getOrder } = newOrderSlice.selectors;
export const { clearNewOrder } = newOrderSlice.actions;
