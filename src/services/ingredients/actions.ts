import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getItems = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);
