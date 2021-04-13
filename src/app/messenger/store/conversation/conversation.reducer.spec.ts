import {MessageKind, QuestionType} from '../../services/types/conversation.types';
import {AuthActions} from '../auth/auth.actions';
import {ConversationActions} from './conversation.actions';
import {conversationReducerFactory} from './conversation.reducer';
import {initialState} from './__test_data__/state';

describe('ConversationReducer', () => {
    describe('unknown action', () => {
        it('returns the default state',  () => {
            const action = AuthActions.refreshToken();

            const state = conversationReducerFactory(initialState.conversation, action);

            expect(state).toEqual(initialState.conversation);
        });
    });

    describe('startConversation', () => {
        it('sets loading to true', () => {
            const action = ConversationActions.startConversation({authToken: 'authToken'});

            const state = conversationReducerFactory({
                ...initialState.conversation,
                isLoading: false,
             },
             action,
            );

            expect(state.isLoading).toBeTrue();
        });
    });

    describe('addMessage', () => {
        it('add message', () => {
            const action = ConversationActions.addMessage({message: {
                kind: MessageKind.statement,
                created_at: '',
                id: '',
                text_html: '<h1>New Message!</h1>',
            }});

            const state = conversationReducerFactory(initialState.conversation, action);

            expect(state.messages.length).toBe(initialState.conversation.messages.length + 1);
        });

        it('sets loading to true if message is not a question', () => {
            const action = ConversationActions.addMessage({message: {
                kind: MessageKind.statement,
                created_at: '',
                id: '',
                text_html: '<h1>New Message!</h1>',
            }});

            const state = conversationReducerFactory({
                ...initialState.conversation,
                isLoading: false,
                activeMessageId: 'message-id',
             },
             action,
            );

            expect(state.isLoading).toBeTrue();
            expect(state.activeMessageId).toBe(null);
        });

        it('sets loading to false if message is a question', () => {
            const action = ConversationActions.addMessage({message: {
                kind: MessageKind.question,
                created_at: '',
                id: '',
                name_html: '',
                question_id: '',
                question_options: [],
                question_type: QuestionType.multiple,
            }});

            const state = conversationReducerFactory({
                ...initialState.conversation,
                isLoading: true,
             },
             action,
            );

            expect(state.isLoading).toBeFalse();
        });

        it('sets active question if message is a quesiton', () => {
            const action = ConversationActions.addMessage({message: {
                kind: MessageKind.question,
                created_at: '',
                id: 'message-id',
                name_html: '',
                question_id: '',
                question_options: [],
                question_type: QuestionType.multiple,
            }});

            const state = conversationReducerFactory({
                ...initialState.conversation,
                activeMessageId: null,
             },
             action,
            );

            expect(state.activeMessageId).toBe('message-id');
        });
    });
})
