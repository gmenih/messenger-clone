import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {createAction, props} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {MagicLinkResponse} from '../../services/types/authentication.types';
import {ErrorProps, StartAuthProps, TokenReceivedProps} from '../types/auth.state';

export const startAuthentication = createAction('[Auth] start', props<StartAuthProps>());
export const tokenReceived = createAction('[Auth] success', props<TokenReceivedProps>());
export const tokenFailed = createAction('[Auth] error', props<ErrorProps>());

@Injectable()
export class AuthEffects {
    public loadAuthToken$ = createEffect(() => this.actions$.pipe(
        ofType(startAuthentication),
        exhaustMap(action =>
            this.authService.authenticateMagicLink(action.pollId).pipe(
                map(response => this.dispatchTokenReceived(response)),
                catchError(() => of(tokenFailed({errorMessage: 'Failed to receive token'}))),
            ),
        ),
    ));

    constructor (
        private readonly actions$: Actions,
        private readonly authService: AuthService,
    ) {}

    private dispatchTokenReceived (response: MagicLinkResponse) {
        const expiresAtEpoch = (response.created_at * 1000) + (response.expires_in * 1000);
        return tokenReceived({
            authToken: `${response.token_type} ${response.access_token}`,
            refreshToken: response.refresh_token,
            expiresAt: new Date(expiresAtEpoch),
        });
    }
}
