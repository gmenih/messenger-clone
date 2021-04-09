// Actions:

import {Action, createReducer, on} from '@ngrx/store';
import {AuthState as AuthState} from '../types/authentication.state';
import {startAuthentication, tokenFailed, tokenReceived} from './auth.effects';


const initialState: AuthState = {
    isLoading: false,
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
        authToken: action.authToken,
        refreshToken: action.refreshToken,
        tokenExpiresAt: action.expiresAt,
    })),
    on(tokenFailed, (state, {errorMessage}) => ({
        ...state,
        error: errorMessage,
    })),
);

export function authReducer (state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}
