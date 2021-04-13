import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {QuestionMessage, QuestionType} from '../../services/types/conversation.types';
import {ConversationFacade} from '../../store/conversation/conversation.facade';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
    @Input() public question!: QuestionMessage;
    @Input() public isActive = false;
    public isMultipleAnswers = false;

    public form?: FormGroup;
    private noneOfTheAboveOptionId?: string;

    constructor (
        private readonly formBuilder: FormBuilder,
        private readonly conversationFacade: ConversationFacade,
    ) { }

    ngOnInit (): void {
        this.isMultipleAnswers = this.question.question_type === QuestionType.multiple;
        this.noneOfTheAboveOptionId = this.question.question_options.find(o => o.nota === true)?.id;
        this.form = this.buildForm();
    }

    public submitAnswer (): void {
        const formValue = this.form?.value;

        if (!formValue) {
            return;
        }

        const options: string[] = this.isMultipleAnswers ?
            Object.keys(formValue.options).filter(key => formValue.options[key] === true) :
            [formValue.options];

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

    public handleNota (optionId: string): void {
        if (
            !this.noneOfTheAboveOptionId ||
            !this.isMultipleAnswers ||
            !(this.form?.controls.options instanceof FormGroup)) {
            return;
        }

        const {options} = this.form.controls;
        const notaValue = options.value[this.noneOfTheAboveOptionId] === true;
        const patchValue = this.getNotaPatchValue(optionId === this.noneOfTheAboveOptionId, notaValue);
        options.patchValue(patchValue);

    }

    private getNotaPatchValue (isNota: boolean, notaValue: boolean): Record<string, boolean> {
        if (notaValue) {
            return Object.fromEntries(
                this.question.question_options
                    .filter(o => o.nota === !isNota)
                    .map(o => ([o.id, false])),
            );
        }

        return {};
    }
}
