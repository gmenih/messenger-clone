import {DisplayableMessage, PollpassMessage} from '../../../services/types/conversation.types';

export interface ConversationState {
    isLoading: boolean;
    messages: DisplayableMessage[];
    activeQuestionId: string | null;
}

export interface SetHistoryProps {
    messages: PollpassMessage[];
}

export interface AddMessageProps {
    message: DisplayableMessage;
}

export interface InvalidMessageProps {
    message: PollpassMessage;
}

export interface SetActiveQuestionProps {
    questionId: string;
}

export interface AnswerQuestionProps {
    questionId: string;
    selectedOptions: string[];
}
