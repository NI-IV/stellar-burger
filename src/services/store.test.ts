import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import { initialState as authState } from './auth/slice';
import { initialState as burgerConstructionState } from './burger-construction/slice';
import { initialState as ingredientsState } from './ingredients/slice';
import { initialState as newOrderState } from './new-order/slice';
import { initialState as ordersState } from './orders/slice';

const testState = {
  ingredients: ingredientsState,
  burgerConstruction: burgerConstructionState,
  auth: authState,
  orders: ordersState,
  newOrder: newOrderState
};

describe('rootReducer test', () => {
  test('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);

    expect(newState).toStrictEqual(testState);
  });
});
