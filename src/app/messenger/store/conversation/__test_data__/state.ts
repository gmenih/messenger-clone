import {AppState} from '../../root.reducer'

export const initialState: AppState = {
    conversation: {
        isLoading: false,
        activeQuestionId: null,
        messages: [
            {
                kind: 'Statement',
                text_html: '<p>Hey! Welcome to the Pollpass Tech Test, let&#39;s jump into some questions about travel...</p>',
                id: 'bf3e6230-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:08.853Z'
            },
            {
                kind: 'Statement',
                text_html: '<p><img src="https://media.giphy.com/media/xUOxeZc41DVT2l9laU/giphy.gif" alt="travel"></p>',
                id: 'c1dbc960-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:13.240Z'
            },
            {
                kind: 'Question',
                name_html: '<p>Which of these countries are you most looking forward to visiting once restrictions are lifted?</p>',
                question_id: '2fcd77eb-b053-424a-a99d-e4d221cfa1fc',
                question_type: 'RadioQuestion',
                question_options: [],
                id: 'c2e85760-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:15.000Z'
            },
            {
                kind: 'AnswerView',
                answers: [
                    {
                        id: '16d86064-a11a-40a2-a0d5-4085abce3268',
                        text_html: '<p>Italy</p>',
                        value: '1'
                    }
                ],
                question_id: '2fcd77eb-b053-424a-a99d-e4d221cfa1fc',
                id: '47e7ee17-c76e-4d7b-9e78-4b6f235bfbb2',
                created_at: '2021-04-13T16:46:16.934Z'
            },
            {
                kind: 'Statement',
                text_html: '<p><img src="https://media.giphy.com/media/dtI3iupMCJ7TAKAyJ8/giphy.gif" alt="Italy"></p>',
                id: 'c4afa9e0-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:17.983Z'
            },
            {
                kind: 'Question',
                name_html: '<p>And which of these countries have you visited before?</p>',
                question_id: '424c6786-8da9-4d94-baab-e8f6710878c5',
                question_type: 'MultipleQuestion',
                question_options: [],
                id: 'c5bc10d0-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:19.742Z'
            },
            {
                kind: 'AnswerView',
                answers: [
                    {
                        id: 'd3278610-4c51-4d68-85f7-e130e2c207dd',
                        text_html: '<p>Brazil</p>',
                        value: '1'
                    }
                ],
                question_id: '424c6786-8da9-4d94-baab-e8f6710878c5',
                id: '6341f230-52d5-4cd7-9f65-d528d355ef05',
                created_at: '2021-04-13T16:46:22.295Z'
            },
            {
                kind: 'Question',
                name_html: '<p>Lastly which type of holiday do you enjoy most?</p>',
                question_id: 'cba685a0-41c6-4554-851b-44a3ba28015f',
                question_type: 'RadioQuestion',
                question_options: [],
                id: 'c7df6600-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:23.330Z'
            },
            {
                kind: 'AnswerView',
                answers: [
                    {
                        id: '4f9cfb38-35e5-456a-8b1c-35e37d138570',
                        text_html: '<p>Beach</p>',
                        value: '1'
                    }
                ],
                question_id: 'cba685a0-41c6-4554-851b-44a3ba28015f',
                id: '303996fe-0277-4221-90de-6c27d0fc285a',
                created_at: '2021-04-13T16:46:24.962Z'
            },
            {
                kind: 'Statement',
                text_html: '<p>Thanks! That&#39;s all i have for now</p>',
                id: 'c9754840-9c77-11eb-93a8-531a8261e972',
                created_at: '2021-04-13T16:46:25.990Z'
            }
        ]
    }
} as any;
