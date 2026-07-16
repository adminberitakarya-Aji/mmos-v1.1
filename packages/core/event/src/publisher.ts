/**
 * MMOS Event — base publisher.
 */

import type { Event } from "./types";
import type { EventPublisher } from "./contracts";

export abstract class BaseEventPublisher implements EventPublisher {
  abstract publish(event: Event): Promise<void>;
}
