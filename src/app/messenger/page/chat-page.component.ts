import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DisplayableMessage} from '../services/types/conversation.types';
import {AuthFacade} from '../store/auth/auth.facade';
import {ConversationFacade} from '../store/conversation/conversation.facade';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
    public receivedMessage: DisplayableMessage[] = [];
    public activeQuestionId?: string;
    public isLoading$: Observable<boolean>;

    constructor (
        private readonly authFacade: AuthFacade,
        private readonly conversationFacade: ConversationFacade,
    ) {
        this.isLoading$ = this.conversationFacade.isLoading$;
    }

    public ngOnInit (): void {
        this.authFacade.authTokens$
            .pipe(take(1))
            .subscribe((authToken) => {
                this.conversationFacade.startConversation(authToken);
            });

        this.conversationFacade.activeQuestionId$
            .subscribe(activeQuestionId => {
                this.activeQuestionId = activeQuestionId ?? undefined;
            });

        this.conversationFacade.messages$
            .subscribe(messages => {
                this.receivedMessage = messages;
            });
    }

    public trackById (_: number, message: DisplayableMessage): string {
        return message.id;
    }
}
