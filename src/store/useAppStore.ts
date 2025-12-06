import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  status?: string;
}

export interface Message {
  id: string;
  sender: User;
  text: string;
  timestamp: Date;
  attachments?: Array<{
    type: 'image' | 'video' | 'file' | 'audio';
    url: string;
    name: string;
  }>;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unread: number;
}

export interface Friend extends User {
  addedAt: Date;
  blocked: boolean;
}

interface AppState {
  currentUser: User | null;
  chats: Chat[];
  friends: Friend[];
  selectedChatId: string | null;
  activeCallId: string | null;
  callRoomId: string | null;
  isDeveloperMode: boolean;
  
  // Actions
  setCurrentUser: (user: User) => void;
  setChats: (chats: Chat[]) => void;
  setFriends: (friends: Friend[]) => void;
  selectChat: (chatId: string) => void;
  startCall: (callId: string, roomId: string) => void;
  endCall: () => void;
  addMessage: (chatId: string, message: Message) => void;
  toggleDeveloperMode: () => void;
  setUserOnlineStatus: (userId: string, isOnline: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  chats: [],
  friends: [],
  selectedChatId: null,
  activeCallId: null,
  callRoomId: null,
  isDeveloperMode: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  
  setChats: (chats) => set({ chats }),
  
  setFriends: (friends) => set({ friends }),
  
  selectChat: (chatId) => set({ selectedChatId: chatId }),
  
  startCall: (callId, roomId) => 
    set({ activeCallId: callId, callRoomId: roomId }),
  
  endCall: () => 
    set({ activeCallId: null, callRoomId: null }),
  
  addMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message,
          }
        : chat
    ),
  })),
  
  toggleDeveloperMode: () => set((state) => ({
    isDeveloperMode: !state.isDeveloperMode,
  })),

  setUserOnlineStatus: (userId, isOnline) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.id === userId ? { ...friend, isOnline } : friend
      ),
      chats: state.chats.map((chat) => ({
        ...chat,
        participants: chat.participants.map((p) =>
          p.id === userId ? { ...p, isOnline } : p
        ),
      })),
    })),
}));
