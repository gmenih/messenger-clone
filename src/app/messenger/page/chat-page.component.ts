import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {DisplayableMessage} from '../services/types/conversation.types';
import {AuthFacade} from '../store/auth/auth.facade';
import {ConversationFacade} from '../store/conversation/conversation.facade';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {
    public receivedMessage: DisplayableMessage[] = [];
    public activeQuestionId?: string;
    public isLoading$: Observable<boolean>;

    public destroyed$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor (
        private readonly authFacade: AuthFacade,
        private readonly conversationFacade: ConversationFacade,
    ) {
        this.isLoading$ = this.conversationFacade.isLoading$;
    }

    public ngOnInit (): void {
        this.authFacade.authTokens$
            .pipe(take(1), takeUntil(this.destroyed$))
            .subscribe((authToken) => {
                this.conversationFacade.startConversation(authToken);
            });

        this.conversationFacade.activeQuestionId$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(activeQuestionId => {
                this.activeQuestionId = activeQuestionId ?? undefined;
            });

        this.conversationFacade.messages$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(messages => {
                this.receivedMessage = messages;
            });
    }

    public ngOnDestroy (): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public trackById (_: number, message: DisplayableMessage): string {
        return message.id;
    }
}
