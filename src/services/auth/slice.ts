import { createSlice, isAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, register, update } from './actions';
import { deleteCookie, setCookie } from '../../utils/cookie';

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
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = undefined;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = undefined;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(logout.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(update.pending, (state) => {
        state.error = undefined;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = undefined;
      })
      .addCase(update.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  }
});

export const reducer = authSlice.reducer;
export const { getUser, getAuthChecked, getError } = authSlice.selectors;
