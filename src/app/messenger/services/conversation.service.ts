import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {WebSocketService} from '../../core/websocket.service';
import {PollpassMessage} from './types/conversation.types';

@Injectable({providedIn: 'root'})
export class ConversationService {
    constructor (private readonly webSocket: WebSocketService<PollpassMessage>) {}

    public connectWithToken (authToken: string): Observable<PollpassMessage> {
        const url = new URL('/conversation', environment.neoBaseEndpoint).toString();
        return this.webSocket.connect(url, authToken).pipe(
            catchError(e => {
                return throwError('fek');
            }),
        );
    }

    public sendMessage (message: PollpassMessage): void {
        this.webSocket.sendMessage(message);
    }

    public close (): void {
        this.webSocket.close();
    }
}
