import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MagicLinkPayload, MagicLinkResponse} from './types/authentication.types';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    static authUrl (pollId: string): string {
        return `/auth/magic_link/${pollId}`;
    }

    constructor(private readonly http: HttpClient) {}

    public authenticateMagicLink (pollId: string): Observable<MagicLinkResponse> {
        const payload: MagicLinkPayload = {
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            scope: 'magic_link',
        };

        return this.http.post<MagicLinkResponse>(AuthenticationService.authUrl(pollId), payload);
    }
}
