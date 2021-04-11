import {IncomingMessage, PollpassMessage, QuestionMessage} from '../../services/types/conversation.types';

export interface ConversationState {
    messages: IncomingMessage[];
    activeQuestion: QuestionMessage | null;
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
    question: QuestionMessage;
}

export interface AnswerQuestionProps {
    questionId: string;
    selectedOptions: string[];
}
