import { expect, test, describe } from '@jest/globals';

import { getAllFeeds, getAllUserOrders } from './actions';
import { initialState, reducer as ordersReduser } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';

const mockOrders = {
  orders: [
    {
      _id: '6620a5c397ede0001d06639b',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-04-18T04:46:59.985Z',
      updatedAt: '2024-04-18T04:47:01.004Z',
      number: 38251
    },
    {
      _id: '6620976097ede0001d06638b',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-04-18T03:45:36.321Z',
      updatedAt: '2024-04-18T03:45:37.153Z',
      number: 38250
    }
  ],
  total: 0,
  totalToday: 0,
  orderRequest: false
};

const newState = (action: UnknownAction) => ordersReduser(initialState, action);

describe('getAllFeeds action tests', () => {
  test('getAllFeeds.pending test', () => {
    const action = {
      type: getAllFeeds.pending.type
    };

    const newStatePending = {
      ...initialState,
      orderRequest: true
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('getAllFeeds.fulfilled test', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: mockOrders
    };

    const newStateFulfilled = {
      ...initialState,
      orderRequest: false,
      orders: mockOrders.orders,
      total: mockOrders.total,
      totalToday: mockOrders.totalToday
    };

    expect(newState(action)).toStrictEqual(newStateFulfilled);
  });

  test('getAllFeeds.rejected test', () => {
    const action = {
      type: getAllFeeds.rejected.type
    };

    const newStateRejected = {
      ...initialState,
      orderRequest: false
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});

describe('getAllUserOrders action tests', () => {
  test('getAllUserOrders.pending test', () => {
    const action = {
      type: getAllUserOrders.pending.type
    };

    const newStatePending = {
      ...initialState,
      orderRequest: true
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('getAllUserOrders.fulfilled test', () => {
    const action = {
      type: getAllUserOrders.fulfilled.type,
      payload: mockOrders.orders
    };

    const newStateFulfilled = {
      ...initialState,
      orderRequest: false,
      orders: mockOrders.orders
    };

    expect(newState(action)).toStrictEqual(newStateFulfilled);
  });

  test('getAllUserOrders.rejected test', () => {
    const action = {
      type: getAllUserOrders.rejected.type
    };

    const newStateRejected = {
      ...initialState,
      orderRequest: false
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});
