// TODO: Delete this file, just initial exploration of messages

export enum MessageKind {
  heartBeat = 'Heartbeat',
  history = 'History',
  question = 'Question',
  statement = 'Statement',
  answer = 'Answer',
  answerView = 'AnswerView',
}

export enum QuestionType {
  radio = 'RadioQuestion',
  multiple = 'MultipleQuestion',
}

export interface QuestionOption {
    id: string;
    name_html: string;
    nota: boolean; // none of the above
  }

export interface BaseMessage {
  id: string;
  created_at: string;
  kind: MessageKind;
}

export interface StatementMessage extends BaseMessage {
  kind: MessageKind.statement;
  text_html: string;
}

export interface QuestionMessage extends BaseMessage {
  kind: MessageKind.question;
  name_html: string;
  question_id: string;
  question_options: QuestionOption[];
  question_type: QuestionType;
}

export interface AnswerMessage extends BaseMessage {
  kind: MessageKind.answer;
  question_id: string;
  meta: unknown; // TODO: figure out
  answers: Record<string, 1 | 0>;
}

export interface AnswerViewMessage extends BaseMessage {
  kind: MessageKind.answerView;
  question_id: string;
  answers: string;
}

export type IncomingMessage =
    | AnswerViewMessage
    | QuestionMessage
    | StatementMessage;


export interface HistoryMessage extends BaseMessage {
    kind: MessageKind.history;
    messages: IncomingMessage[];
}

export type OutgoingMessage =
    | AnswerMessage;

export type PollpassMessage =
    | StatementMessage
    | QuestionMessage
    | AnswerMessage
    | AnswerViewMessage
    | HistoryMessage;
