import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  Timestamp,
  writeBatch,
  doc,
} from 'firebase/firestore';
import { Message, Chat } from '@/store/useAppStore';

// Firestore collections
export const MESSAGES_COLLECTION = 'messages';
export const CHATS_COLLECTION = 'chats';
export const USERS_COLLECTION = 'users';

// Types for Firestore
export interface FirestoreMessage {
  id?: string;
  chatId: string;
  senderId: string;
  senderUsername: string;
  senderAvatar: string;
  text: string;
  timestamp: Timestamp;
  createdAt?: Date;
}

export interface FirestoreChat {
  id?: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage?: string;
  lastMessageTime?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Send a message to Firestore
 */
export async function sendMessage(
  chatId: string,
  userId: string,
  username: string,
  avatar: string,
  text: string
): Promise<string> {
  if (!db) throw new Error('Firebase not configured');

  try {
    const messagesRef = collection(db, MESSAGES_COLLECTION);

    const docRef = await addDoc(messagesRef, {
      chatId,
      senderId: userId,
      senderUsername: username,
      senderAvatar: avatar,
      text,
      timestamp: Timestamp.now(),
      createdAt: new Date(),
    });

    // Update chat's last message
    await updateChatLastMessage(chatId, text);

    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Get all messages for a chat
 */
export async function getChatMessages(chatId: string): Promise<Message[]> {
  if (!db) throw new Error('Firebase not configured');

  try {
    const messagesRef = collection(db, MESSAGES_COLLECTION);
    const q = query(
      messagesRef,
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const snapshot = await getDocs(q);
    const messages: Message[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as FirestoreMessage;
      messages.push({
        id: doc.id,
        sender: {
          id: data.senderId,
          username: data.senderUsername,
          avatar: data.senderAvatar,
          isOnline: true,
        },
        text: data.text,
        timestamp: data.timestamp.toDate(),
      });
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

/**
 * Subscribe to real-time message updates
 */
export function subscribeToMessages(
  chatId: string,
  callback: (messages: Message[]) => void
): () => void {
  if (!db) {
    console.error('Firebase not configured');
    return () => {};
  }

  try {
    const messagesRef = collection(db, MESSAGES_COLLECTION);
    const q = query(
      messagesRef,
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreMessage;
        messages.push({
          id: doc.id,
          sender: {
            id: data.senderId,
            username: data.senderUsername,
            avatar: data.senderAvatar,
            isOnline: true,
          },
          text: data.text,
          timestamp: data.timestamp.toDate(),
        });
      });

      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to messages:', error);
    return () => {};
  }
}

/**
 * Create or get chat
 */
export async function getOrCreateChat(
  participantIds: string[],
  participantNames: string[]
): Promise<string> {
  if (!db) throw new Error('Firebase not configured');

  try {
    const chatsRef = collection(db, CHATS_COLLECTION);

    // Sort to ensure consistent query
    const sortedIds = [...participantIds].sort();
    const q = query(
      chatsRef,
      where('participantIds', '==', sortedIds)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }

    // Create new chat
    const docRef = await addDoc(chatsRef, {
      participantIds: sortedIds,
      participantNames,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error getting/creating chat:', error);
    throw error;
  }
}

/**
 * Update chat's last message
 */
export async function updateChatLastMessage(
  chatId: string,
  lastMessage: string
): Promise<void> {
  if (!db) throw new Error('Firebase not configured');

  try {
    const chatRef = doc(db, CHATS_COLLECTION, chatId);
    const batch = writeBatch(db);

    batch.update(chatRef, {
      lastMessage,
      lastMessageTime: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    await batch.commit();
  } catch (error) {
    console.error('Error updating chat:', error);
    // Don't throw - this is not critical
  }
}

/**
 * Get user chats
 */
export async function getUserChats(userId: string): Promise<string[]> {
  if (!db) throw new Error('Firebase not configured');

  try {
    const chatsRef = collection(db, CHATS_COLLECTION);
    const q = query(
      chatsRef,
      where('participantIds', 'array-contains', userId)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error('Error fetching user chats:', error);
    return [];
  }
}
