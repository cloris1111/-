
export enum ChatRole {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}
