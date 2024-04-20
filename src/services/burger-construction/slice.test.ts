import { expect, test, describe } from '@jest/globals';

import {
  initialState,
  reducer as burgerConstructionReducer,
  addItemToConstruction,
  removeItemFromConstruction
} from './slice';
import { ingredients } from '../../data';

const mockIngredients = [
  {
    ...ingredients[0],
    id: '0'
  },
  {
    ...ingredients[1],
    id: '1'
  }
];

const mockNewIngredient = {
  ...ingredients[2],
  id: '2'
};

const mockState = {
  ...initialState,
  ingredients: mockIngredients
};

describe('burgerConstructionReducer action tests', () => {
  test('addItemToConstruction test', () => {
    const newState = burgerConstructionReducer(
      mockState,
      addItemToConstruction(mockNewIngredient)
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([...mockIngredients, mockNewIngredient]);
  });

  test('removeItemFromConstruction test', () => {
    const newState = burgerConstructionReducer(
      mockState,
      removeItemFromConstruction(mockIngredients[0])
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([mockIngredients[1]]);
  });
});
