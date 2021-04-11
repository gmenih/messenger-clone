import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MagicLinkPayload, MagicLinkResponse, RefreshTokenPayload} from './types/authentication.types';

@Injectable({providedIn: 'root'})
export class AuthService {
    static makeUrl (url: string): string {
        return new URL(url, environment.restApiBaseEndpoint).toString();
    }

    constructor(private readonly http: HttpClient) {}

    public authenticateMagicLink (pollId: string): Observable<MagicLinkResponse> {
        const payload: MagicLinkPayload = {
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            scope: 'magic_link',
        };

        return this.http.post<MagicLinkResponse>(AuthService.makeUrl(`/auth/magic_link/${pollId}`), payload);
    }

    public refreshMagicLink (refreshToken: string): Observable<MagicLinkResponse> {
        const payload: RefreshTokenPayload = {
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            scope: 'magic_link',
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };

        return this.http.post<MagicLinkResponse>(AuthService.makeUrl('/auth/magic_link'), payload);
    }
}
