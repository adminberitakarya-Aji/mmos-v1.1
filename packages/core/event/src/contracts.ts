import type { Event } from "./types";

export type EventHandler =
    (event: Event) => Promise<void>;

export interface EventPublisher {

    publish(
        event: Event
    ): Promise<void>;

}

export interface EventSubscriber {

    subscribe(
        topic: string,
        handler: EventHandler
    ): Promise<void>;

    unsubscribe(
        topic: string,
        handler: EventHandler
    ): Promise<void>;

}