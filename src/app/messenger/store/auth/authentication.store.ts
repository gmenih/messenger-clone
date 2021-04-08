// Actions:

import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {AuthenticationStore as AuthenticationState, TokenReceivedProps} from './types/authentication.state';

const startAuthentication = createAction('[Auth] preAuth');
const tokenReceived = createAction('[Auth] token received', props<TokenReceivedProps>());

const initialState: AuthenticationState = {
    isLoading: false,
    authToken: '',
    refreshToken: '',
    tokenExpiresAt: new Date(0),
};

const _authReducer = createReducer(
    initialState,
    on(startAuthentication, state => ({...state, isLoading: true})),
    on(tokenReceived, (state, action) => ({
        ...state,
        authToken: action.authToken,
        refreshToken: action.refreshToken,
        tokenExpiresAt: new Date(action.createdAt + action.expiresIn),
    })),
);

export function authReducer (state: AuthenticationState | undefined, action: Action): AuthenticationState {
    return _authReducer(state, action);
}
