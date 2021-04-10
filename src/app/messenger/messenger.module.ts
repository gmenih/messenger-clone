import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {AnswerComponent} from './components/answer/answer.component';
import {MessageComponent} from './components/message/message.component';
import {AuthGuard} from './guards/auth.guard';
import {ChatPageComponent} from './page/chat-page.component';
import {AuthEffects} from './store/auth/auth.effects';
import {ConversationEffects} from './store/conversation/conversation.effects';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':pollId',
                canActivate: [AuthGuard],
                component: ChatPageComponent,
            },
        ]),
        EffectsModule.forFeature([AuthEffects, ConversationEffects]),
    ],
    declarations: [
        MessageComponent,
        AnswerComponent,
        ChatPageComponent,
    ],
})
export class MessengerModule {}
