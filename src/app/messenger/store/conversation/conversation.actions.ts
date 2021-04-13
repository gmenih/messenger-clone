import {createAction, props} from '@ngrx/store';
import {AddMessageProps, AnswerQuestionProps, InvalidMessageProps, SetHistoryProps} from './types/conversation.state';

export const ConversationActions = {
    startConversation: createAction('[Convo] Start', props<{authToken: string}>()),

    setHistory: createAction('[Convo] Set History', props<SetHistoryProps>()),
    addMessage: createAction('[Convo] New Message', props<AddMessageProps>()),
    answerQuestion: createAction('[Convo] Submit Answer', props<AnswerQuestionProps>()),

    invalidMessage: createAction('[Convo] Invalid Message', props<InvalidMessageProps>()),
    goodbye: createAction('[Convo] Goodbye'),
};
