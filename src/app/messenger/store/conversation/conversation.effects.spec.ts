import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {ConversationService} from '../../services/conversation.service';
import {MessageKind} from '../../services/types/conversation.types';
import {AppState} from '../root.reducer';
import {ConversationActions} from './conversation.actions';
import {ConversationEffects} from './conversation.effects';
import {initialState} from './__test_data__/state';

describe('ConversationEffects', () => {
    let testScheduler: TestScheduler;
    let actions$: Observable<Action>;
    let effects: ConversationEffects;
    let conversationService: ConversationService;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        conversationService = jasmine.createSpyObj('con', ['connectWithToken', 'sendMessage', 'close']);

        TestBed.configureTestingModule({
            providers: [
                ConversationEffects,
                {provide: ConversationService, useValue: conversationService},
                provideMockActions(() => actions$),
                provideMockStore<AppState>({initialState}),
            ],
        });

        effects = TestBed.inject(ConversationEffects);
    });

    describe('startConversation$', () => {
        it('reacts on startConversation action', () => {
            testScheduler.run(({hot, expectObservable}) => {
                (conversationService.connectWithToken as jasmine.Spy).and.returnValue(of(
                    {kind: MessageKind.question},
                ));

                actions$ = hot('a', {
                    a: ConversationActions.startConversation({authToken: ''})
                });

                expectObservable(effects.startConversation$).toBe('(a)', {
                    a: ConversationActions.addMessage({message: {kind: MessageKind.question}} as any),
                });
            });
        });

        it('opens a web socket connection', () => {
            testScheduler.run(({hot, expectObservable}) => {
                (conversationService.connectWithToken as jasmine.Spy).and.returnValue(of(
                    {kind: MessageKind.question},
                ));

                actions$ = hot('a', {
                    a: ConversationActions.startConversation({authToken: 'authToken'})
                });

                expectObservable(effects.startConversation$).toBe('(a)', {
                    a: ConversationActions.addMessage({message: {kind: MessageKind.question}} as any),
                });

            });

            expect(conversationService.connectWithToken).toHaveBeenCalledTimes(1);
            expect(conversationService.connectWithToken).toHaveBeenCalledOnceWith('authToken');
        });

        it('adds messages for certain kinds', () => {
            testScheduler.run(({hot, expectObservable}) => {
                (conversationService.connectWithToken as jasmine.Spy).and.returnValue(of(
                    {kind: MessageKind.question},
                    {kind: MessageKind.statement},
                    {kind: MessageKind.question},
                    {kind: MessageKind.answerView},
                    {kind: MessageKind.goodbye},
                ));

                actions$ = hot('a', {
                    a: ConversationActions.startConversation({authToken: 'authToken'})
                });

                expectObservable(effects.startConversation$).toBe('(abcde)', {
                    a: ConversationActions.addMessage({message: {kind: MessageKind.question}} as any),
                    b: ConversationActions.addMessage({message: {kind: MessageKind.statement}} as any),
                    c: ConversationActions.addMessage({message: {kind: MessageKind.question}} as any),
                    d: ConversationActions.addMessage({message: {kind: MessageKind.answerView}} as any),
                    e: ConversationActions.goodbye(),
                });
            });
        });

        it('publishes history actions when kind is history', () => {
            testScheduler.run(({hot, expectObservable}) => {
                (conversationService.connectWithToken as jasmine.Spy).and.returnValue(of(
                    {kind: MessageKind.history, messages: [1, 2, 3]},
                ));

                actions$ = hot('a', {
                    a: ConversationActions.startConversation({authToken: 'authToken'})
                });

                expectObservable(effects.startConversation$).toBe('(a)', {
                    a: ConversationActions.setHistory({messages: [1, 2, 3]} as any),
                });
            });
        });
    });

    describe('processHistory$', () => {
        it('runs through history and publishes add messages', () => {
            testScheduler.run(({hot, expectObservable}) => {
                actions$ = hot('a', {
                    a: ConversationActions.setHistory({
                        messages: [
                            {kind: MessageKind.statement},
                            {kind: MessageKind.question},
                            {kind: MessageKind.answerView},
                        ]
                    } as any),
                });

                expectObservable(effects.processHistory$).toBe('(abc)', {
                    a: ConversationActions.addMessage({message: {kind: MessageKind.statement}} as any),
                    b: ConversationActions.addMessage({message: {kind: MessageKind.question}} as any),
                    c: ConversationActions.addMessage({message: {kind: MessageKind.answerView}} as any),
                });
            });
        });
    });

    describe('answerQuestion$', () => {
        it('sends a message through websocket', () => {
            actions$ = of(ConversationActions.answerQuestion({
                answer: {kind: MessageKind.answer}
            } as any));

            effects.answerQuestion$.subscribe();

            expect(conversationService.sendMessage).toHaveBeenCalledTimes(1);
            expect(conversationService.sendMessage).toHaveBeenCalledOnceWith(
                {kind: MessageKind.answer} as any,
            );
        });
    });
    describe('closeConnection$', () => {
        it('closes websocked connection when receiving goodbye message', () => {
            actions$ = of(ConversationActions.goodbye());

            effects.closeConnection$.subscribe();

            expect(conversationService.close).toHaveBeenCalledTimes(1);
        });
    });
});
