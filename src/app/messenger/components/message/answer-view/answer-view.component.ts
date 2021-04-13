import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AnswerViewMessage} from '../../../services/types/conversation.types';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerViewComponent {
    @Input() public answerView!: AnswerViewMessage;
}
