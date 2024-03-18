import { loginUserApi, registerUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk('auth/register', registerUserApi);
export const login = createAsyncThunk('auth/login', loginUserApi);
