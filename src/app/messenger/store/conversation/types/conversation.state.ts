import {AnswerMessage, DisplayableMessage, PollpassMessage} from '../../../services/types/conversation.types';

export interface ConversationState {
    isLoading: boolean;
    messages: DisplayableMessage[];
    activeMessageId: string | null;
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
    answer: AnswerMessage;
}
