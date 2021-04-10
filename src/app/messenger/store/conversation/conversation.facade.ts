import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PollpassMessage} from '../../services/types/conversation.types';
import {AppState} from '../types/app.state';
import {ConversationActions} from './conversation.effects';

@Injectable({providedIn: 'root'})
export class ConversationFacade {
    public messages$: Observable<PollpassMessage[]>;

    constructor(private readonly store: Store<AppState>) {
        const conversationStore = this.store.select(s => s.conversation);

        this.messages$ = conversationStore.pipe(select(state => state.messages));
    }

    public startConversation (authToken: string): void {
        this.store.dispatch(ConversationActions.startConversation({authToken}));
    }
}
