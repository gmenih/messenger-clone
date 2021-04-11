import {createAction, props} from '@ngrx/store';
import {ErrorProps, StartAuthProps, TokenReceivedProps} from '../types/auth.state';

export const AuthActions = {
    startAuth: createAction('[Auth] start', props<StartAuthProps>()),
    refreshToken: createAction('[Auth] refresh'),
    setToken: createAction('[Auth] success', props<TokenReceivedProps>()),
    setError: createAction('[Auth] error', props<ErrorProps>()),
};
