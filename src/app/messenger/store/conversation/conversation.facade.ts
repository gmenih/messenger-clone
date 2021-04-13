import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {v4 as uuid} from 'uuid';
import {AnswerMessage, DisplayableMessage, MessageKind} from '../../services/types/conversation.types';
import {AppState} from '../root.reducer';
import {ConversationActions} from './conversation.actions';

@Injectable({providedIn: 'root'})
export class ConversationFacade {
    public messages$: Observable<DisplayableMessage[]>;
    public activeQuestionId$: Observable<string | null>;
    public isLoading$: Observable<boolean>;

    constructor (private readonly store: Store<AppState>) {
        const conversationStore = this.store.select(s => s.conversation);

        this.messages$ =         conversationStore.pipe(select(state => state.messages));
        this.activeQuestionId$ = conversationStore.pipe(select(state => state.activeMessageId));
        this.isLoading$ =        conversationStore.pipe(select(state => state.isLoading));
    }

    public startConversation (authToken: string): void {
        this.store.dispatch(ConversationActions.startConversation({authToken}));
    }

    public answerQuestion (questionId: string, selectedOptions: string[]): void {
        this.store.dispatch(ConversationActions.answerQuestion({
            answer: this.buildAnswer(questionId, selectedOptions),
        }));
    }

    private buildAnswer (questionId: string, selectedOptions: string[]): AnswerMessage {
        const answers = selectedOptions.map(option => ([option, 1]));

        return {
            created_at: new Date().toISOString(),
            id: uuid(),
            kind: MessageKind.answer,
            question_id: questionId,
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
}
