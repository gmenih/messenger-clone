import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, filter, skipUntil, tap} from 'rxjs/operators';
import {AuthFacade} from '../store/auth/auth.facade';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor (private readonly authFacade: AuthFacade) { }

    public canActivate (route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const pollId = route.params.pollId;

        return this.authFacade.isAuthenticated$.pipe(
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this.authFacade.authenticate(pollId);
                }
            }),
            skipUntil(this.authFacade.isLoading$.pipe(
                filter((loading) => !loading),
            )),
            catchError((e) => {
                console.error(e);
                return of(false);
            }),
        );
    }
}
