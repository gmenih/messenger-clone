// TODO: Delete this file, just initial exploration of messages

enum MessageKind {
  heartBeat = 'Heartbeat',
  history = 'History',
  question = 'Question',
  statement = 'Statement',
  answer = 'Answer',
  answerView = 'AnswerView',
  goodbye = 'GoodBye',
}

enum QuestionType {
  Radio = 'RadioQuestion',
  Multiple = 'MultipleQuestion',
}

export interface BaseMessage {
  id: string;
  created_at: string;
  kind: MessageKind;
}

export interface PollpassStatementMessage extends BaseMessage {
  kind: MessageKind.statement;
  text_html: string;
}

export interface PollpassQuestionMessage extends BaseMessage {
  kind: MessageKind.question;
  name_html: string;
  question_id: string;
  question_options: QuestionOption[];
  question_type: QuestionType;
}

export interface PollpassAnswerMessage extends BaseMessage {
  kind: MessageKind.answer;
  question_id: string;
  meta: unknown; // TODO: figure out
  answers: Record<string, 1 | 0>;
}

export interface PollpassAnswerViewMessage extends BaseMessage {
  kind: MessageKind.answerView;
  question_id: string;
  answers: string;
}

export interface QuestionOption {
  id: string;
  name_html: string;
  nota: boolean; // none of the above
}
