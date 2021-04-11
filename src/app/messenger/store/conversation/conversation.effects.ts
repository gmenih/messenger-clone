import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, filter, map, tap} from 'rxjs/operators';
import {ConversationService} from '../../services/conversation.service';
import {AnswerMessage, IncomingMessage, MessageKind, PollpassMessage} from '../../services/types/conversation.types';
import {AuthActions} from '../auth/auth.actions';
import {AnswerQuestionProps} from '../types/conversation.state';
import {ConversationActions} from './conversation.actions';
import {ConversationFacade} from './conversation.facade';

function isNonNull<T> (value: T): value is NonNullable<T> {
    return value != null;
}

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

    public answerQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(ConversationActions.answerQuestion),
        exhaustMap(action => this.conversationFacade.activeQuestion$.pipe(
            filter(isNonNull),
            tap(question => this.conversationService.sendMessage(this.answerQuestion(action, question)))
        )),
    ), {dispatch: false});

    constructor(
        private readonly actions$: Actions,
        private readonly conversationFacade: ConversationFacade,
        private readonly conversationService: ConversationService,
    ) { }

    private distributeMessage (message: PollpassMessage): Action {
        switch (message.kind) {
            case 'AnswerView':
            case 'Statement':
                return ConversationActions.addMessage({message});
            case 'Question':
                return ConversationActions.setActiveQuestion({question: message});
            case 'History':
                return ConversationActions.setHistory({messages: message.messages});
            default:
                return ConversationActions.invalidMessage({message});
        }
    }

    private answerQuestion (action: AnswerQuestionProps, question: IncomingMessage): AnswerMessage {
        const answers = action.selectedOptions.map(option => ([option, 1]));

        return {
            created_at: new Date().toISOString(),
            id: '',
            kind: MessageKind.answer,
            question_id: question.id,
            answers: Object.fromEntries(answers),
            meta: {},
        };
    }

    private addErrorMessage (error: string): Action {
        return ConversationActions.addMessage({
            message: {
                kind: MessageKind.error,
                created_at: new Date().toISOString(),
                errorMessage: error,
                id: '',
            },
        });
    }
}
