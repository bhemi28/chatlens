import { create } from 'zustand';
import { Message } from './parser';

interface ChatState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),
}));
