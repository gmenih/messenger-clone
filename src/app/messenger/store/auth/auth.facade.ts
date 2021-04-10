import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthState} from '../types/auth.state';
import {startAuthentication} from './auth.effects';

@Injectable({providedIn: 'root'})
export class AuthFacade {
    public readonly isLoading$: Observable<boolean>;
    public readonly isAuthenticated$: Observable<boolean>;
    public readonly authToken$: Observable<string>;

    constructor(private readonly store: Store<AuthState>) {
        this.isLoading$ = store.select(state => state.isLoading);
        this.isAuthenticated$ = store.select(state => !state.isLoading && !!state.refreshToken);
        this.authToken$ = store.select(state => state.authToken);
    }

    public authenticate (pollId: string): void {
        this.store.dispatch(startAuthentication({pollId}));
    }
}
