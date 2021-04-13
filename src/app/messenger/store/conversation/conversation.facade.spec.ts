import {Injector} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {first} from 'rxjs/operators';
import {AppState} from '../root.reducer';
import {ConversationActions} from './conversation.actions';
import {ConversationFacade} from './conversation.facade';
import {initialState} from './__test_data__/state';

describe('ConversationFacade', () => {
    let facade: ConversationFacade;
    let mockStore: MockStore<AppState>;

    beforeEach(() => {
        const injector = Injector.create({
            providers: [provideMockStore({initialState})]
        });

        mockStore = injector.get(MockStore);
        facade = new ConversationFacade(mockStore);
    });

    describe('selectors', () => {
        it('selects all messages', async () => {
            const result = await facade.messages$.pipe(first()).toPromise();

            expect(result).toBe(initialState.conversation.messages);
            expect(result.length).toBeGreaterThan(1);
        });
    });

    describe('startConversation()', () => {
        it('dispatches start conversation action with authToken', () => {
            spyOn(mockStore, 'dispatch');
            spyOn(ConversationActions, 'startConversation').and.callThrough();

            facade.startConversation('authToken');

            expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
            expect(ConversationActions.startConversation).toHaveBeenCalledWith({
                authToken: 'authToken',
            });
        });
    });

    describe('answerQuestion()', () => {
        it('builds an answer and dispatches the action', () => {
            spyOn(mockStore, 'dispatch');
            spyOn(ConversationActions, 'answerQuestion').and.callThrough();

            facade.answerQuestion('question-id', ['option-1', 'option-2']);

            expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
            expect(ConversationActions.answerQuestion).toHaveBeenCalledWith({
                answer: jasmine.objectContaining({
                    question_id: 'question-id',
                    answers: {
                        'option-1': 1,
                        'option-2': 1,
                    },
                }) as any
            });
        });
    })
});
