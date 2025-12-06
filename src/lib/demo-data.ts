import { User, Message } from '@/store/useAppStore';

/**
 * Generate mock users with real avatars
 */
export const MOCK_USERS: Record<string, User> = {
  alice: {
    id: 'user-alice',
    username: 'Alice Cooper',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    isOnline: true,
    status: 'Available',
  },
  bob: {
    id: 'user-bob',
    username: 'Bob Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    isOnline: true,
    status: 'Busy',
  },
  charlie: {
    id: 'user-charlie',
    username: 'Charlie Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    isOnline: false,
    status: 'Away',
  },
  diana: {
    id: 'user-diana',
    username: 'Diana Prince',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    isOnline: true,
    status: 'Available',
  },
  eve: {
    id: 'user-eve',
    username: 'Eve Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve',
    isOnline: true,
    status: 'Available',
  },
};

/**
 * Generate demo messages
 */
export function generateDemoMessages(userId: string, otherUser: User): Message[] {
  const now = new Date();
  const messages: Message[] = [];

  const conversations: { sender: User; text: string; minutesAgo: number }[] = [
    {
      sender: otherUser,
      text: 'Hey! How are you doing? 👋',
      minutesAgo: 45,
    },
    {
      sender: { ...MOCK_USERS.alice, id: userId },
      text: 'Hi! I\'m doing great, thanks for asking! How about you?',
      minutesAgo: 43,
    },
    {
      sender: otherUser,
      text: 'Pretty good! Working on some cool projects 🚀',
      minutesAgo: 40,
    },
    {
      sender: { ...MOCK_USERS.alice, id: userId },
      text: 'That sounds exciting! Tell me more!',
      minutesAgo: 38,
    },
    {
      sender: otherUser,
      text: 'Building a modern messenger with WebRTC and real-time sync 💬',
      minutesAgo: 35,
    },
    {
      sender: otherUser,
      text: 'It\'s been a fun journey so far!',
      minutesAgo: 33,
    },
    {
      sender: { ...MOCK_USERS.alice, id: userId },
      text: 'Wow, that\'s awesome! I\'d love to check it out 🎉',
      minutesAgo: 30,
    },
    {
      sender: otherUser,
      text: 'Sure! Let me send you a link soon',
      minutesAgo: 28,
    },
  ];

  conversations.forEach(conv => {
    const timestamp = new Date(now.getTime() - conv.minutesAgo * 60 * 1000);
    messages.push({
      id: `msg-${Date.now()}-${Math.random()}`,
      sender: conv.sender,
      text: conv.text,
      timestamp,
    });
  });

  return messages;
}

/**
 * Get random online users
 */
export function getRandomUsers(count: number, exclude: string[] = []): User[] {
  const allUsers = Object.values(MOCK_USERS).filter(
    u => !exclude.includes(u.id)
  );
  return allUsers.slice(0, count);
}
