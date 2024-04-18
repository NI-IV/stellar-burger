import { expect, test, describe } from '@jest/globals';

import { getItems } from './actions';
import { initialState, reducer as ingredientsReducer } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';

const mockIngredients = [
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
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

const newState = (action: UnknownAction) =>
  ingredientsReducer(initialState, action);

describe('ingredients action test', () => {
  test('ingredients.pending test', () => {
    const action = {
      type: getItems.pending.type
    };

    const newStatePending = {
      ...initialState,
      isIngredientsLoading: true
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('ingredients.fulfilled test', () => {
    const action = {
      type: getItems.fulfilled.type,
      payload: mockIngredients
    };

    const newStatePending = {
      ...initialState,
      ingredients: mockIngredients,
      isIngredientsLoading: false
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });
});