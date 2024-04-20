import { expect, test, describe } from '@jest/globals';

import { getItems } from './actions';
import { initialState, reducer as ingredientsReducer } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { ingredients as mockIngredients } from '../../data';

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
