import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {StorageService} from '../../../core/storage.service';
import {AuthService} from '../../services/auth.service';
import {MagicLinkResponse} from '../../services/types/authentication.types';
import {AuthStored} from './types/auth.state';
import {AuthActions} from './auth.actions';
import {AuthFacade} from './auth.facade';


const AUTH_TOKEN_KEY = 'pp_auth';

@Injectable()
export class AuthEffects {
    public loadAuthToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.startAuth),
        exhaustMap(action => {
            const storage = this.storageService.getItem<AuthStored>(AUTH_TOKEN_KEY);
            if (storage) {
                return of(AuthActions.setToken({
                    accessToken: storage.accessToken,
                    refreshToken: storage.refreshToken,
                    expiresAt: new Date(storage.expiresAt),
                }));
            }

            return this.authService.authenticateMagicLink(action.pollId).pipe(
                map(response => this.dispatchTokenReceived(response)),
                catchError(() => of(AuthActions.setError({errorMessage: 'Failed to receive token'}))),
            );
        })
    ));

    public storeToken$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.setToken),
            tap(action => {
                this.storageService.setItem<AuthStored>(AUTH_TOKEN_KEY, {
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken,
                    expiresAt: action.expiresAt.getTime(),
                });
            }),
        ),
        {dispatch: false},
    );

    public refreshToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.refreshToken),
        exhaustMap(() => this.authFacade.refreshToken$.pipe(
            switchMap(token => this.authService.refreshMagicLink(token)),
            map(response => this.dispatchTokenReceived(response)),
            catchError(() => of(AuthActions.setError({errorMessage: 'Failed to receive token'}))),
        )),
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly authFacade: AuthFacade,
        private readonly authService: AuthService,
        private readonly storageService: StorageService,
    ) {}

    private dispatchTokenReceived (response: MagicLinkResponse): Action {
        const expiresAtEpoch = (response.created_at * 1000) + (response.expires_in * 1000);
        return AuthActions.setToken({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresAt: new Date(expiresAtEpoch),
        });
    }
}
