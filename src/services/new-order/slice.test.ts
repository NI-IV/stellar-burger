import { expect, test, describe } from '@jest/globals';

import { createNewOrder } from './actions';
import { initialState, reducer as newOrderReduser } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { ingredients as mockIngredients } from '../../data';

const mockNewOrder = {
  order: {
    _id: '0101010101010',
    status: 'done',
    name: 'Burger',
    createdAt: '18/04/2024',
    updatedAt: '18/04/2024',
    number: 121,
    ingredients: mockIngredients,
  },
  name: 'Burger',
  orderRequest: true
};

const newState = (action: UnknownAction) =>
  newOrderReduser(initialState, action);

describe('newOrder action test', () => {
  test('newOrder.pending test', () => {
    const action = {
      type: createNewOrder.pending.type
    };

    const newStatePending = {
      ...initialState,
      orderRequest: true
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('newOrder.fulfilled test', () => {
    const action = {
      type: createNewOrder.fulfilled.type,
      payload: mockNewOrder
    };

    const newStateFulfilled = {
      ...initialState,
      orderRequest: false,
      order: mockNewOrder.order,
      name: mockNewOrder.name
    };

    expect(newState(action)).toStrictEqual(newStateFulfilled);
  });

  test('newOrder.rejected test', () => {
    const action = {
      type: createNewOrder.rejected.type
    };

    const newStateRejected = {
      ...initialState,
      orderRequest: false
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});
