import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AnswerComponent} from './components/answer/answer.component';
import {MessageComponent} from './components/message/message.component';
import {ChatPageComponent} from './page/chat-page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: ChatPageComponent,
            },
        ]),
    ],
    declarations: [
        MessageComponent,
        AnswerComponent,
        ChatPageComponent,
    ],
})
export class MessengerModule {}
