// WebSocket utilities for real-time chat and notifications
export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('[WebSocket] Connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocket] Error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WebSocket] Connection closed');
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `[WebSocket] Attempting reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      setTimeout(() => this.connect().catch(console.error), this.reconnectDelay);
    } else {
      console.error('[WebSocket] Max reconnection attempts reached');
    }
  }

  send(event: string, data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data, timestamp: new Date() }));
    } else {
      console.warn('[WebSocket] Connection not ready');
    }
  }

  onMessage(callback: (event: string, data: any) => void) {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        try {
          const { event: eventType, data } = JSON.parse(event.data);
          callback(eventType, data);
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error);
        }
      };
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Browser notification utilities
export class NotificationManager {
  static requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('[Notifications] Not supported in this browser');
      return Promise.resolve('denied');
    }
    return Notification.requestPermission();
  }

  static sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

  static incomingCall(caller: string) {
    this.sendNotification(`${caller} is calling...`, {
      icon: '/icons/fox-logo.svg',
      tag: 'incoming-call',
      requireInteraction: true,
    });
  }

  static newMessage(senderName: string, message: string) {
    this.sendNotification(`${senderName}: ${message}`, {
      icon: '/icons/fox-logo.svg',
      tag: 'new-message',
    });
  }
}
