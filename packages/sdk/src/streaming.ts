/**
 * MMOS SDK Streaming
 *
 * Streaming utilities for real-time execution updates.
 */

export interface StreamMessage<T = unknown> {
  type: "event" | "data" | "error" | "complete" | "heartbeat";
  payload: T;
  timestamp: Date;
  executionId?: string;
}

export interface StreamOptions {
  onMessage?: (message: StreamMessage) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface EventStream {
  close(): void;
  onMessage(handler: (message: StreamMessage) => void): () => void;
  onError(handler: (error: Error) => void): () => void;
  onComplete(handler: () => void): () => void;
}

export class EventSourceStream implements EventStream {
  private eventSource: EventSource | null = null;
  private handlers: Map<string, Set<Function>> = new Map();

  constructor(private url: string, private options: StreamOptions = {}) {}

  connect(): void {
    this.eventSource = new EventSource(this.url);

    this.eventSource.onmessage = (event) => {
      try {
        const message: StreamMessage = JSON.parse(event.data);
        this.emit("message", message);
      } catch (e) {
        this.emit("error", new Error("Failed to parse stream message"));
      }
    };

    this.eventSource.onerror = (_error) => {
      this.emit("error", new Error("Stream connection error"));
      if (this.options.reconnect) {
        this.reconnect();
      }
    };

    this.eventSource.addEventListener("complete", () => {
      this.emit("complete");
      this.close();
    });
  }

  private reconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
    setTimeout(() => this.connect(), this.options.reconnectInterval ?? 5000);
  }

  onMessage(handler: (message: StreamMessage) => void): () => void {
    return this.on("message", handler);
  }

  onError(handler: (error: Error) => void): () => void {
    return this.on("error", handler);
  }

  onComplete(handler: () => void): () => void {
    return this.on("complete", handler);
  }

  private on(event: string, handler: Function): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  private off(event: string, handler: Function): void {
    this.handlers.get(event)?.delete(handler);
  }

  private emit(event: string, ...args: unknown[]): void {
    this.handlers.get(event)?.forEach((handler) => handler(...args));
  }

  close(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.handlers.clear();
  }
}

export function createStream(url: string, options?: StreamOptions): EventStream {
  const stream = new EventSourceStream(url, options);
  stream.connect();
  return stream;
}