import {createAction, props} from '@ngrx/store';
import {AddMessageProps, AnswerQuestionProps, InvalidMessageProps, SetActiveQuestionProps, SetHistoryProps} from '../types/conversation.state';

export const ConversationActions = {
    startConversation: createAction('[Convo] start', props<{authToken: string}>()),

    setHistory: createAction('[Convo] history', props<SetHistoryProps>()),
    addMessage: createAction('[Convo] message', props<AddMessageProps>()),
    setActiveQuestion: createAction('[Convo] question', props<SetActiveQuestionProps>()),
    answerQuestion: createAction('[Convo] answer', props<AnswerQuestionProps>()),

    invalidMessage: createAction('[Convo] invalid', props<InvalidMessageProps>()),
};
