import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {StorageService} from '../../../core/storage.service';
import {AuthService} from '../../services/auth.service';
import {AppState} from '../root.reducer';
import {AuthActions} from './auth.actions';
import {AuthEffects} from './auth.effects';
import {AuthFacade} from './auth.facade';

describe('AuthSpec', () => {
    let testScheduler: TestScheduler;
    let actions$: Observable<Action>;
    let effects: AuthEffects;
    let authService: AuthService;
    let authFacade: AuthFacade;
    let storageService: StorageService;

    const initialState: Pick<AppState, 'auth'> = {
        auth: {
            isLoading: false,
            accessToken: '',
            refreshToken: '',
            tokenExpiresAt: new Date(0),
        }
    };

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        storageService = jasmine.createSpyObj('storage', ['getItem', 'setItem']);
        authService = jasmine.createSpyObj('auth', ['authenticateMagicLink', 'refreshMagicLink']);

        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                AuthFacade,
                {provide: AuthService, useValue: authService},
                {provide: StorageService, useValue: storageService},
                provideMockActions(() => actions$),
                provideMockStore<any>({initialState}),
            ],
        });

        effects = TestBed.inject(AuthEffects);
    });

    describe('loadAuthToken$', () => {
        it('reads token from storage if it exists', () => {
            (storageService.getItem as jasmine.Spy).and.returnValue({
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
                expiresAt: '2021-12-31T00:00:00Z',
            });

            testScheduler.run(({hot, expectObservable}) => {
                actions$ = hot('a', {
                    a: AuthActions.startAuth({pollId: 'pollId'}),
                });

                expectObservable(effects.loadAuthToken$).toBe('a', {
                    a: AuthActions.setToken({
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                        expiresAt: new Date('2021-12-31T00:00:00Z'),
                    }),
                });
            });

            expect(authService.authenticateMagicLink).not.toHaveBeenCalled();
        });

        it('gets token from auth service if not in storage', () => {
            (authService.authenticateMagicLink as jasmine.Spy).and.returnValue(of({
                access_token: 'accessToken',
                refresh_token: 'refreshToken',
                created_at: 1618342963,
                expires_in: 0,
            }));

            testScheduler.run(({hot, expectObservable}) => {
                actions$ = hot('a', {
                    a: AuthActions.startAuth({pollId: 'pollId'}),
                });

                expectObservable(effects.loadAuthToken$).toBe('(a)', {
                    a: AuthActions.setToken({
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                        expiresAt: new Date(1618342963000),
                    }),
                });
            });

            expect(authService.authenticateMagicLink).toHaveBeenCalledOnceWith('pollId');
        })
    });

    describe('storeToken$', () => {
        it('stores token to storage', () => {
            actions$ = of(AuthActions.setToken({
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
                expiresAt: new Date(0),
            }));

            effects.storeToken$.subscribe();

            expect(storageService.setItem).toHaveBeenCalledOnceWith(
                'pp_auth',
                {
                    accessToken: 'accessToken',
                    refreshToken: 'refreshToken',
                    expiresAt: 0,
                },
            );
        });
    });
});
