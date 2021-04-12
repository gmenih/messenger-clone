import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IncomingMessage, MessageKind, StatementMessage} from '../../services/types/conversation.types';
import {AppState} from '../types/app.state';
import {ConversationActions} from './conversation.actions';

@Injectable({providedIn: 'root'})
export class ConversationFacade {
    public messages$: Observable<IncomingMessage[]>;
    public activeQuestionId$: Observable<string | null>;

    constructor(private readonly store: Store<AppState>) {
        const conversationStore = this.store.select(s => s.conversation);

        this.messages$ = conversationStore.pipe(select(state => state.messages));
        this.activeQuestionId$ = conversationStore.pipe(select(state => state.activeQuestionId));
    }

    public startConversation (authToken: string): void {
        this.store.dispatch(ConversationActions.startConversation({authToken}));
    }

    public answerQuestion (questionId: string, selectedOptions: string[]): void {
        this.store.dispatch(ConversationActions.answerQuestion({
            questionId,
            selectedOptions,
        }));
    }
}
