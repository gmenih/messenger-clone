import {IncomingMessage, PollpassMessage, QuestionMessage} from '../../services/types/conversation.types';

export interface ConversationState {
    isLoading: boolean;
    messages: IncomingMessage[];
    activeQuestionId: string | null;
}

export interface SetHistoryProps {
    messages: PollpassMessage[];
}

export interface AddMessageProps {
    message: IncomingMessage;
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
