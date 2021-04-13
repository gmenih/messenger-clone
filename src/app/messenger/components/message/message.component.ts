import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AnswerViewMessage, DisplayableMessage, MessageKind, QuestionMessage, QuestionType, StatementMessage} from '../../services/types/conversation.types';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
    @Input() public message!: DisplayableMessage;
    @Input() public activeQuestionId?: string;

    public questionMessage?: QuestionMessage;
    public answerViewMessage?: AnswerViewMessage;
    public statementMessage?: StatementMessage;

    public ngOnInit (): void {
        // bit of a hack to prevent angular from crying due to bad type safety in the tempalte
        this.questionMessage = this.message.kind === MessageKind.question ? this.message : undefined;
        this.statementMessage = this.message.kind === MessageKind.statement ? this.message : undefined;
        this.answerViewMessage = this.message.kind === MessageKind.answerView ? this.message : undefined;
    }
}
