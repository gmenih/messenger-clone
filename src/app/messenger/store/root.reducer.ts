import {authReducerFactory} from './auth/auth.reducer';
import {conversationReducerFactory} from './conversation/conversation.reducer';

export const rootReducer = () => ({
    auth: authReducerFactory,
    conversation: conversationReducerFactory,
});
