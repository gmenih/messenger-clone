import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {MessageComponent} from './components/message/message.component';
import {AuthGuard} from './guards/auth.guard';
import {ChatPageComponent} from './page/chat-page.component';
import {AuthEffects} from './store/auth/auth.effects';
import {ConversationEffects} from './store/conversation/conversation.effects';
import { BubbleComponent } from './components/bubble/bubble.component';
import { StatementComponent } from './components/message/statement/statement.component';
import { QuestionComponent } from './components/message/question/question.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        ChatPageComponent,
        BubbleComponent,
        StatementComponent,
        QuestionComponent,
    ],
})
export class MessengerModule {}
