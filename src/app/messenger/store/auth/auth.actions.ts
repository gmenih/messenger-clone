import {createAction, props} from '@ngrx/store';
import {ErrorProps, StartAuthProps, TokenReceivedProps} from './types/auth.state';

export const AuthActions = {
    startAuth: createAction('[Auth] Start', props<StartAuthProps>()),
    refreshToken: createAction('[Auth] Refresh Token'),
    setToken: createAction('[Auth] Set Token', props<TokenReceivedProps>()),
    setError: createAction('[Auth] Error', props<ErrorProps>()),
};
