import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getItems } from './actions';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      });
  }
});

export const reducer = ingredientsSlice.reducer;
export const { getIngredients, getIsIngredientsLoading } =
  ingredientsSlice.selectors;
