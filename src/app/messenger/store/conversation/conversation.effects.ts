import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {ConversationService} from '../../services/conversation.service';
import {MessageKind, PollpassMessage} from '../../services/types/conversation.types';
import {AuthActions} from '../auth/auth.actions';
import {ConversationActions} from './conversation.actions';

@Injectable()
export class ConversationEffects {
    public startConversation$ = createEffect(() => this.actions$.pipe(
        ofType(ConversationActions.startConversation),
        exhaustMap(action =>
            this.conversationService.connectWithToken(action.authToken).pipe(
                map(message => this.distributeMessage(message)),
                catchError(() => of(
                    AuthActions.refreshToken(),
                    this.addErrorMessage('Oops! Failed to connect, let\'s try refreshing your token!'),
                )),
            ),
        ),
    ));

    public processHistory$ = createEffect(() => this.actions$.pipe(
        ofType(ConversationActions.setHistory),
        exhaustMap(action => action.messages.map(message => this.distributeMessage(message))),
    ));

    public answerQuestion$ = createEffect(
        () => this.actions$.pipe(
            ofType(ConversationActions.answerQuestion),
            tap(action => this.conversationService.sendMessage(action.answer))
        ),
        {dispatch: false},
    );

    public closeConnection$ = createEffect(
        () => this.actions$.pipe(
            ofType(ConversationActions.goodbye),
            tap(() => this.conversationService.close())
        ),
        {dispatch: false},
    );
    constructor (
        private readonly actions$: Actions,
        private readonly conversationService: ConversationService,
    ) {}

    private distributeMessage (message: PollpassMessage): Action {
        switch (message.kind) {
            case MessageKind.answerView:
            case MessageKind.statement:
            case MessageKind.question:
                return ConversationActions.addMessage({message});
            case MessageKind.history:
                return ConversationActions.setHistory({messages: message.messages});
            case MessageKind.goodbye:
                return ConversationActions.goodbye();
            default:
                return ConversationActions.invalidMessage({message});
        }
    }

    private addErrorMessage (error: string): Action {
        return ConversationActions.addMessage({
            message: {
                kind: MessageKind.statement,
                created_at: new Date().toISOString(),
                text_html: error,
                id: '',
            },
        });
    }
}
