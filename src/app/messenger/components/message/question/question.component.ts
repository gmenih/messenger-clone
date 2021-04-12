import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionMessage, QuestionType} from '../../../services/types/conversation.types';
import {ConversationFacade} from '../../../store/conversation/conversation.facade';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
    @Input() public question!: QuestionMessage;
    @Input() public isActive: boolean = false;
    public isMultipleAnswers: boolean = false;

    public form?: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly conversationFacade: ConversationFacade,
    ) { }

    ngOnInit (): void {
        this.isMultipleAnswers = this.question.question_type === QuestionType.multiple;
        this.form = this.buildForm();
    }

    public submitAnswer () {
        const formValue = this.form?.value;
        console.log(formValue);
        if (!formValue) {
            return;
        }

        const options: string[] = this.isMultipleAnswers ?
            Object.keys(formValue.options).filter(key => formValue.options[key] === true) :
            [formValue.options as string];

        console.log(options);

        this.conversationFacade.answerQuestion(this.question.question_id, options);
    }

    private buildForm (): FormGroup {
        return this.formBuilder.group({
            options: this.buildOptions(),
        });
    }

    private buildOptions (): AbstractControl {
        if (this.isMultipleAnswers) {
            return this.formBuilder.group(Object.fromEntries(
                this.question.question_options.map(o => ([o.id, false])),
            ));
        }

        return this.formBuilder.control('');
    }
}
