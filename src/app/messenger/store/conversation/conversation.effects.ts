import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {ConversationService} from '../../services/conversation.service';
import {AnswerMessage, MessageKind, PollpassMessage} from '../../services/types/conversation.types';
import {AuthActions} from '../auth/auth.actions';
import {AnswerQuestionProps} from '../types/conversation.state';
import {ConversationActions} from './conversation.actions';
import {v4 as uuid} from 'uuid';

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
            tap(action => this.conversationService.sendMessage(this.answerQuestion(action)))
        ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly conversationService: ConversationService,
    ) { }

    private distributeMessage (message: PollpassMessage): Action {
        switch (message.kind) {
            case 'AnswerView':
            case 'Statement':
            case 'Question':
                return ConversationActions.addMessage({message});
            case 'History':
                return ConversationActions.setHistory({messages: message.messages});
            default:
                return ConversationActions.invalidMessage({message});
        }
    }

    private answerQuestion (action: AnswerQuestionProps): AnswerMessage {
        const answers = action.selectedOptions.map(option => ([option, 1]));

        return {
            created_at: new Date().toISOString(),
            id: uuid(),
            kind: MessageKind.answer,
            question_id: action.questionId,
            answers: Object.fromEntries(answers),
            meta: {
                quick: false,
                direct: false,
                indecisive: false,
                shown_at: Math.floor((Date.now() / 1000)),
                answered_at: Math.floor((Date.now() / 1000)),
                device_pixel_ratio: 1,
                screen_resolution_height: 3440,
                screen_resolution_width: 1440,
                window_resolution_height: 1720,
                window_resolution_width: 848,
            },
        };
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
