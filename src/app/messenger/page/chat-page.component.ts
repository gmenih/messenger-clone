import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PollpassMessage} from '../services/types/conversation.types';
import {AuthFacade} from '../store/auth/auth.facade';
import {ConversationFacade} from '../store/conversation/conversation.facade';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
    public messages$: Observable<PollpassMessage[]>;

    constructor (
        private readonly authFacade: AuthFacade,
        private readonly conversationFacade: ConversationFacade,
    ) {
        this.messages$ = this.conversationFacade.messages$;
    }

    public ngOnInit (): void {
        this.authFacade.authToken$.subscribe((authToken) => {
            this.conversationFacade.startConversation(authToken);
        });
    }
}
