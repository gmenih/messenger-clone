import {AuthState} from './auth.state';
import {ConversationState} from './conversation.state';

export interface AppState {
    auth: AuthState;
    conversation: ConversationState;
}
