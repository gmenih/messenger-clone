import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AnswerViewMessage, DisplayableMessage, MessageKind, QuestionMessage, QuestionType, StatementMessage} from '../../services/types/conversation.types';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
    public EnumMessageKind: typeof MessageKind = MessageKind;
    public EnumQuestionType: typeof QuestionType = QuestionType;

    @Input() public message!: DisplayableMessage;
    @Input() public activeQuestionId?: string;

    public questionMessage?: QuestionMessage;
    public answerViewMessage?: AnswerViewMessage;
    public statementMessage?: StatementMessage;

    public ngOnInit (): void {
    }
}
