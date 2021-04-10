import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({providedIn: 'root'})
export class WebSocketService<TMessage> {
    private socket$?: WebSocketSubject<TMessage>;

    public connect (url: string, protocol: string): Observable<TMessage> {
        this.socket$ = webSocket<TMessage>({
            url,
            protocol,
        });

        return this.socket$.asObservable();
    }

    public sendMessage (message: TMessage): void {
        this.socket$?.next(message);
    }

    public close (): void {
        this.socket$?.complete();
    }
}
