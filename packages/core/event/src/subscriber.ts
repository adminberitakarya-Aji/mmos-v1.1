/**
 * MMOS Event — base subscriber.
 */

import type { EventHandler, EventSubscriber } from "./contracts";

export abstract class BaseEventSubscriber implements EventSubscriber {
  abstract subscribe(topic: string, handler: EventHandler): Promise<void>;
  abstract unsubscribe(topic: string, handler: EventHandler): Promise<void>;
}
