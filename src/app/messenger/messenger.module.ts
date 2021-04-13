import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {AnswerViewComponent} from './components/answer-view/answer-view.component';
import {BubbleComponent} from './components/bubble/bubble.component';
import {MessageComponent} from './components/message/message.component';
import {QuestionComponent} from './components/question/question.component';
import {StatementComponent} from './components/statement/statement.component';
import {AuthGuard} from './guards/auth.guard';
import {ChatPageComponent} from './page/chat-page.component';
import {AuthEffects} from './store/auth/auth.effects';
import {ConversationEffects} from './store/conversation/conversation.effects';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';

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
        LoadingDotsComponent,
    ],
})
export class MessengerModule {}
