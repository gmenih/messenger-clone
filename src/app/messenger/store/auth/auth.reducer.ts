import {Action, createReducer, on} from '@ngrx/store';
import {AuthState as AuthState} from './types/auth.state';
import {AuthActions} from './auth.actions';

const initialState: AuthState = {
    isLoading: true,
    accessToken: '',
    refreshToken: '',
    tokenExpiresAt: new Date(0),
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.startAuth, state => ({...state, isLoading: true})),
    on(AuthActions.setToken, (state, action) => ({
        ...state,
        isLoading: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenExpiresAt: action.expiresAt,
    })),
    on(AuthActions.setError, (state, {errorMessage}) => ({
        ...state,
        isLoading: false,
        error: errorMessage,
    })),
);

export function authReducerFactory (state: AuthState | undefined, action: Action): AuthState {
    return authReducer(state, action);
}
