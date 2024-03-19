import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientsReducer } from './ingredients/slice';
import { reducer as burgerConstructionReducer } from './burger-construction/slice';
import { reducer as authReduser } from './auth/slice';
import { reducer as ordersReduser } from './orders/slice';
import { reducer as newOrderReduser } from './new-order/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstruction: burgerConstructionReducer,
  auth: authReduser,
  orders: ordersReduser,
  newOrder: newOrderReduser
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
