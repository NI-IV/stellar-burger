import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk('auth/register', registerUserApi);
export const login = createAsyncThunk('auth/login', loginUserApi);
export const logout = createAsyncThunk('auth/logout', logoutApi);
export const update = createAsyncThunk('auth/update', updateUserApi);
export const check = createAsyncThunk('auth/check', getUserApi);
