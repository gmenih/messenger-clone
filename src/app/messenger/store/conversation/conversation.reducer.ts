// Actions:

import {Action, createReducer, on} from '@ngrx/store';
import {ConversationState} from '../types/conversation.state';
import {ConversationActions} from './conversation.effects';


const initialState: ConversationState = {
    currentQuestion: null,
    messages: [],
};

// Reducer
const conversationReducer = createReducer(
    initialState,
    on(ConversationActions.setHistory, (state, action) => ({
        ...state,
        messages: action.messages,
        currentQuestion: action.messages[action.messages.length - 1]?.id ?? null,
    })),
    on(ConversationActions.addMessage, (state, action) => ({
        ...state,
        messages: [...state.messages, action.message],
        currentQuestion: action.message.id,
    })),
);

export function conversationReducerFactory (state: ConversationState | undefined, action: Action): ConversationState {
    return conversationReducer(state, action);
}
