import { expect, test, describe } from '@jest/globals';

import { createNewOrder } from './actions';
import { initialState, reducer as newOrderReduser } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';

const mockNewOrder = {
  order: {
    _id: '0101010101010',
    status: 'done',
    name: 'Burger',
    createdAt: '18/04/2024',
    updatedAt: '18/04/2024',
    number: 121,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ]
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
