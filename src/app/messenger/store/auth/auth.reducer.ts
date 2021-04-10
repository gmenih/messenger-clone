// Actions:

import {Action, createReducer, on} from '@ngrx/store';
import {AuthState as AuthState} from '../types/auth.state';
import {startAuthentication, tokenFailed, tokenReceived} from './auth.effects';


const initialState: AuthState = {
    isLoading: true,
    authToken: '',
    refreshToken: '',
    tokenExpiresAt: new Date(0),
};

// Reducer
const _authReducer = createReducer(
    initialState,
    on(startAuthentication, state => ({...state, isLoading: true})),
    on(tokenReceived, (state, action) => ({
        ...state,
        isLoading: false,
        authToken: action.authToken,
        refreshToken: action.refreshToken,
        tokenExpiresAt: action.expiresAt,
    })),
    on(tokenFailed, (state, {errorMessage}) => ({
        ...state,
        isLoading: false,
        error: errorMessage,
    })),
);

export function authReducer (state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}
