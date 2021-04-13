import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {StatementMessage} from '../../services/types/conversation.types';

@Component({
    selector: 'app-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementComponent {
    @Input() public statement!: StatementMessage;
}
