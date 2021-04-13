// Actions:

import {Action, createReducer, on} from '@ngrx/store';
import {MessageKind} from '../../services/types/conversation.types';
import {ConversationActions} from './conversation.actions';
import {ConversationState} from './types/conversation.state';


const initialState: ConversationState = {
    isLoading: false,
    activeQuestionId: null,
    messages: [],
};

const conversationReducer = createReducer(
    initialState,
    on(ConversationActions.startConversation, (state) => ({...state, isLoading: true})),
    on(ConversationActions.addMessage, (state, action) => ({
        ...state,
        messages: [...state.messages, action.message],
        activeQuestionId: action.message.kind === MessageKind.question ? action.message.id : null,
        isLoading: action.message.kind !== MessageKind.question,
    })),
    on(ConversationActions.goodbye, (state) => ({
        ...state,
        isLoading: false,
    })),
);

export function conversationReducerFactory (state: ConversationState | undefined, action: Action): ConversationState {
    return conversationReducer(state, action);
}
