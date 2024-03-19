import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getItems = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);
