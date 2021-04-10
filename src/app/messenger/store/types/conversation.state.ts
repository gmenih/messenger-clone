import {IncomingMessage, PollpassMessage} from '../../services/types/conversation.types';

export interface ConversationState {
    messages: PollpassMessage[];
    currentQuestion: string | null;
}

export interface SetHistoryProps {
    messages: IncomingMessage[];
}

export interface AnswerQuestionProps {

}

export interface AddMessageProps {
    message: PollpassMessage;
}

export interface AuthState {
    isLoading: boolean;
    authToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    error?: string;
}

export interface TokenReceivedProps {
    authToken: string;
    refreshToken: string;
    expiresAt: Date;
}

export interface StartAuthProps {
    pollId: string;
}

export interface ErrorProps {
    errorMessage: string;
}
