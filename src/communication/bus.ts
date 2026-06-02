/**
 * Message Bus — Inter-agent communication
 */

export interface Message {
  id: string;
  from: string;
  to: string | 'broadcast';
  type: 'task' | 'result' | 'status' | 'error';
  payload: unknown;
  timestamp: Date;
}

export class MessageBus {
  private handlers: Map<string, ((msg: Message) => void)[]> = new Map();

  /**
   * Subscribe to messages
   */
  subscribe(agentId: string, handler: (msg: Message) => void): void {
    const handlers = this.handlers.get(agentId) || [];
    handlers.push(handler);
    this.handlers.set(agentId, handlers);
  }

  /**
   * Publish a message
   */
  publish(msg: Message): void {
    if (msg.to === 'broadcast') {
      // Send to all subscribers
      for (const handlers of this.handlers.values()) {
        for (const handler of handlers) {
          handler(msg);
        }
      }
    } else {
      // Send to specific agent
      const handlers = this.handlers.get(msg.to) || [];
      for (const handler of handlers) {
        handler(msg);
      }
    }
  }

  /**
   * Send a message
   */
  send(from: string, to: string, type: Message['type'], payload: unknown): void {
    this.publish({
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      from,
      to,
      type,
      payload,
      timestamp: new Date(),
    });
  }

  /**
   * Broadcast a message
   */
  broadcast(from: string, type: Message['type'], payload: unknown): void {
    this.send(from, 'broadcast', type, payload);
  }
}
