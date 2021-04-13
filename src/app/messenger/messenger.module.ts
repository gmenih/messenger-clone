import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {BubbleComponent} from './components/bubble/bubble.component';
import {AnswerViewComponent} from './components/message/answer-view/answer-view.component';
import {MessageComponent} from './components/message/message.component';
import {QuestionComponent} from './components/message/question/question.component';
import {StatementComponent} from './components/message/statement/statement.component';
import {AuthGuard} from './guards/auth.guard';
import {ChatPageComponent} from './page/chat-page.component';
import {AuthEffects} from './store/auth/auth.effects';
import {ConversationEffects} from './store/conversation/conversation.effects';

const material: NgModule['imports'] = [
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
];

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

        ...material,
    ],
    declarations: [
        AnswerViewComponent,
        BubbleComponent,
        ChatPageComponent,
        MessageComponent,
        QuestionComponent,
        StatementComponent,
    ],
})
export class MessengerModule {}
