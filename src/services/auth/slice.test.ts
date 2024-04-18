import { expect, test, describe, jest } from '@jest/globals';
import 'jest-localstorage-mock';

import { register, login, logout, update, check } from './actions';
import { initialState, reducer as authReduser } from './slice';
import { UnknownAction } from '@reduxjs/toolkit';
import * as cookie from '../../utils/cookie';

const mockUserData = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Igor'
  }
};

const mockError = {
  message: 'Error message'
};

const newState = (action: UnknownAction) => authReduser(initialState, action);

describe('register action tests', () => {
  test('register.pending test', () => {
    const action = {
      type: register.pending.type,
      payload: mockUserData
    };

    const newStatePending = {
      ...initialState,
      isAuthChecked: false,
      error: undefined
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('register.fulfilled test', () => {
    const action = {
      type: register.fulfilled.type,
      payload: mockUserData
    };

    const newStateFulfilled = {
      ...initialState,
      isAuthChecked: true,
      user: mockUserData.user,
      error: undefined
    };

    jest.spyOn(cookie, 'setCookie').mockImplementation(jest.fn());
    localStorage.setItem('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    expect(newState(action)).toStrictEqual(newStateFulfilled);

    localStorage.clear();
  });

  test('register.rejected test', () => {
    const action = {
      type: register.rejected.type,
      error: mockError
    };

    const newStateRejected = {
      ...initialState,
      isAuthChecked: false,
      error: mockError.message
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});

describe('login action tests', () => {
  test('login.pending test', () => {
    const action = {
      type: login.pending.type,
      payload: mockUserData
    };

    const newStatePending = {
      ...initialState,
      isAuthChecked: false,
      error: undefined
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('login.fulfilled test', () => {
    const action = {
      type: login.fulfilled.type,
      payload: mockUserData
    };

    const newStateFulfilled = {
      ...initialState,
      isAuthChecked: true,
      user: mockUserData.user,
      error: undefined
    };

    jest.spyOn(cookie, 'setCookie').mockImplementation(jest.fn());
    localStorage.setItem('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    expect(newState(action)).toStrictEqual(newStateFulfilled);

    localStorage.clear();
  });

  test('login.rejected test', () => {
    const action = {
      type: login.rejected.type
    };

    const newStateRejected = {
      ...initialState,
      isAuthChecked: false
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});

describe('logout action tests', () => {
  test('logout.pending test', () => {
    const action = {
      type: logout.pending.type
    };

    const newStatePending = {
      ...initialState,
      error: undefined
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('logout.fulfilled test', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: undefined
    };

    jest.spyOn(cookie, 'deleteCookie').mockImplementation(jest.fn());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    expect(newState(action)).toStrictEqual(initialState);
  });

  test('logout.rejected test', () => {
    const action = {
      type: logout.rejected.type,
      error: mockError
    };

    const newStateRejected = {
      ...initialState,
      isAuthChecked: false,
      error: mockError.message
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});

describe('update action tests', () => {
  test('update.pending test', () => {
    const action = {
      type: update.pending.type,
      payload: mockUserData
    };

    const newStatePending = {
      ...initialState,
      error: undefined
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('update.fulfilled test', () => {
    const action = {
      type: update.fulfilled.type,
      payload: mockUserData
    };

    const newStateFulfilled = {
      ...initialState,
      user: mockUserData.user,
      error: undefined
    };

    expect(newState(action)).toStrictEqual(newStateFulfilled);
  });

  test('update.rejected test', () => {
    const action = {
      type: update.rejected.type,
      error: mockError
    };

    const newStateRejected = {
      ...initialState,
      error: mockError.message
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});

describe('check action tests', () => {
  test('check.pending test', () => {
    const action = {
      type: check.pending.type,
      payload: mockUserData
    };

    const newStatePending = {
      ...initialState,
      isAuthChecked: false
    };

    expect(newState(action)).toStrictEqual(newStatePending);
  });

  test('check.fulfilled test', () => {
    const action = {
      type: check.fulfilled.type,
      payload: mockUserData
    };

    const newStateFulfilled = {
      ...initialState,
      isAuthChecked: true,
      user: mockUserData.user
    };

    expect(newState(action)).toStrictEqual(newStateFulfilled);
  });

  test('check.rejected test', () => {
    const action = {
      type: check.rejected.type
    };

    const newStateRejected = {
      ...initialState,
      isAuthChecked: false
    };

    expect(newState(action)).toStrictEqual(newStateRejected);
  });
});
