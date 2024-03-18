import { createSlice, isAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, register } from './actions';
import { setCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser;
  isAuthChecked: boolean;
  error: string | undefined;
};

const initialState: TAuthState = {
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  error: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = undefined;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = undefined;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
      });
  }
});

export const reducer = authSlice.reducer;
export const { getUser, getAuthChecked, getError } = authSlice.selectors;
