import {Injectable} from '@angular/core';
import {createSelector, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../types/app.state';
import {AuthState} from '../types/auth.state';
import {AuthActions} from './auth.effects';

@Injectable({providedIn: 'root'})
export class AuthFacade {
    public readonly isLoading$: Observable<boolean>;
    public readonly isAuthenticated$: Observable<boolean>;
    public readonly authToken$: Observable<string>;

    constructor(private readonly store: Store<AppState>) {
        const authStore = this.store.select(state => state.auth);

        this.isLoading$ = authStore.pipe(select(state => state.isLoading));
        this.isAuthenticated$ = authStore.pipe(select(state => !state.isLoading && !!state.accessToken));
        this.authToken$ = authStore.pipe(select(state => state.accessToken));
    }

    public authenticate (pollId: string): void {
        this.store.dispatch(AuthActions.startAuth({pollId}));
    }
}
