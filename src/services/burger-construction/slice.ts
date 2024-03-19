import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBurgerConstructionState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructionState = {
  bun: null,
  ingredients: []
};

const burgerConstructionSlice = createSlice({
  name: 'burgerConstruction',
  initialState,
  reducers: {
    addItemToConstruction: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        const item = { ...action.payload, id: state.ingredients.length };
        state.ingredients.push(item);
      }
    },
    removeItemFromConstruction: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearConstruction: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const reducer = burgerConstructionSlice.reducer;
export const {
  addItemToConstruction,
  removeItemFromConstruction,
  clearConstruction
} = burgerConstructionSlice.actions;
