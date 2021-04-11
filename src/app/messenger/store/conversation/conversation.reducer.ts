// Actions:

import {Action, createReducer, on} from '@ngrx/store';
import {IncomingMessage, MessageKind} from '../../services/types/conversation.types';
import {ConversationState} from '../types/conversation.state';
import {ConversationActions} from './conversation.actions';


const initialState: ConversationState = {
    activeQuestion: null,
    messages: [],
};

function getCurrentQuestionId (message: IncomingMessage | null): string | null {
    return message?.kind === MessageKind.question ? message.id : null;
}

// Reducer
const conversationReducer = createReducer(
    initialState,
    on(ConversationActions.setActiveQuestion, (state, action) => ({
        ...state,
        activeQuestion: action.question,
    })),
    on(ConversationActions.addMessage, (state, action) => ({
        ...state,
        messages: [...state.messages, action.message],
    })),
);

export function conversationReducerFactory (state: ConversationState | undefined, action: Action): ConversationState {
    return conversationReducer(state, action);
}
