import {authReducerFactory} from './auth/auth.reducer';
import {AuthState} from './auth/types/auth.state';
import {conversationReducerFactory} from './conversation/conversation.reducer';
import {ConversationState} from './conversation/types/conversation.state';

export interface AppState {
    auth: AuthState;
    conversation: ConversationState;
}

export const rootReducer = () => ({
    auth: authReducerFactory,
    conversation: conversationReducerFactory,
});
