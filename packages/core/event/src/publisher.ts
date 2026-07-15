import {
    Event
} from "./types";

import {
    EventPublisher
} from "./contracts";

export abstract class BaseEventPublisher
implements EventPublisher {

    abstract publish(
        event: Event
    ): Promise<void>;

}