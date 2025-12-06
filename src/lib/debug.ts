// Debug and monitoring utilities for developer mode
export interface DebugInfo {
  wsConnected: boolean;
  rtcConnections: number;
  messagesQueued: number;
  memoryUsage?: number;
  timestamp: Date;
}

export class DebugManager {
  private static debugMode = false;
  private static logs: Array<{ level: string; message: string; timestamp: Date }> = [];

  static toggleDebugMode() {
    this.debugMode = !this.debugMode;
    console.log(`[Debug] Mode ${this.debugMode ? 'enabled' : 'disabled'}`);
  }

  static isDebugMode(): boolean {
    return this.debugMode;
  }

  static log(message: string, data?: any) {
    if (this.debugMode) {
      const logEntry = { level: 'INFO', message, timestamp: new Date() };
      this.logs.push(logEntry);
      console.log(`[Fox Debug] ${message}`, data);
    }
  }

  static error(message: string, error?: any) {
    const logEntry = { level: 'ERROR', message, timestamp: new Date() };
    this.logs.push(logEntry);
    console.error(`[Fox Error] ${message}`, error);
  }

  static warn(message: string, data?: any) {
    if (this.debugMode) {
      const logEntry = { level: 'WARN', message, timestamp: new Date() };
      this.logs.push(logEntry);
      console.warn(`[Fox Warning] ${message}`, data);
    }
  }

  static getDebugInfo(): DebugInfo {
    return {
      wsConnected: true,
      rtcConnections: 0,
      messagesQueued: 0,
      timestamp: new Date(),
    };
  }

  static getLogs(limit: number = 50) {
    return this.logs.slice(-limit);
  }

  static clearLogs() {
    this.logs = [];
  }
}

export class ErrorTracker {
  private static errors: Array<{
    message: string;
    stack?: string;
    context?: string;
    timestamp: Date;
  }> = [];

  static trackError(error: Error, context?: string) {
    const errorEntry = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date(),
    };
    this.errors.push(errorEntry);
    console.error(`[Error Tracked] ${error.message}`, error);
  }

  static getErrors(limit: number = 20) {
    return this.errors.slice(-limit);
  }

  static clearErrors() {
    this.errors = [];
  }

  static reportToVercel(error: Error) {
    // Send error to Vercel monitoring service
    if (typeof window !== 'undefined') {
      fetch('/api/debug/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          userAgent: navigator.userAgent,
          timestamp: new Date(),
        }),
      }).catch(console.error);
    }
  }
}
