import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../root.reducer';
import {AuthActions} from './auth.actions';

@Injectable({providedIn: 'root'})
export class AuthFacade {
    public readonly isLoading$: Observable<boolean>;
    public readonly isAuthenticated$: Observable<boolean>;
    public readonly authTokens$: Observable<string>;
    public readonly refreshToken$: Observable<string>;

    constructor (private readonly store: Store<AppState>) {
        const authStore = this.store.select(state => state.auth);

        this.isLoading$ =       authStore.pipe(select(state => state.isLoading));
        this.isAuthenticated$ = authStore.pipe(select(state => !state.isLoading && !!state.accessToken));
        this.authTokens$ =      authStore.pipe(select(state => state.accessToken));
        this.refreshToken$ =    authStore.pipe(select(state => state.refreshToken));
    }

    public authenticate (pollId: string): void {
        this.store.dispatch(AuthActions.startAuth({pollId}));
    }
}
