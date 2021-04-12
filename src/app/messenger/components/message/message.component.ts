import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IncomingMessage, MessageKind, QuestionType} from '../../services/types/conversation.types';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
    public EnumMessageKind: typeof MessageKind = MessageKind;
    public EnumQuestionType: typeof QuestionType = QuestionType;

    @Input() public message!: IncomingMessage;
    @Input() public activeQuestionId?: string;
}
