// TODO: Delete this file, just initial exploration of messages

export enum MessageKind {
  heartBeat = 'Heartbeat',
  history = 'History',
  question = 'Question',
  statement = 'Statement',
  answer = 'Answer',
  answerView = 'AnswerView',
  error = 'Error',
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

export interface AnswerMeta {
    quick: boolean;
    direct: boolean;
    indecisive: boolean;
    shown_at: number;
    answered_at: number;
    screen_resolution_width: number;
    screen_resolution_height: number;
    device_pixel_ratio: number;
    window_resolution_width: number;
    window_resolution_height: number;
}

export interface AnswerMessage extends BaseMessage {
  kind: MessageKind.answer;
  question_id: string;
  meta: AnswerMeta;
  answers: Record<string, 1 | 0>;
}

export interface AnswerViewMessage extends BaseMessage {
  kind: MessageKind.answerView;
  question_id: string;
  answers: string;
}

// this message exists only within this app, used to
// display errors to the user
export interface ErrorMessage extends BaseMessage {
    kind: MessageKind.error;
    errorName?: string;
    errorMessage: string;
}

export type IncomingMessage =
    | AnswerViewMessage
    | QuestionMessage
    | StatementMessage;

export interface HistoryMessage extends BaseMessage {
    kind: MessageKind.history;
    messages: PollpassMessage[];
}

export type OutgoingMessage =
    | AnswerMessage;

export type PollpassMessage =
    | StatementMessage
    | QuestionMessage
    | AnswerMessage
    | AnswerViewMessage
    | HistoryMessage;
