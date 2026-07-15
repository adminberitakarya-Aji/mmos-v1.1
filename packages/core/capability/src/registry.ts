import {
    Capability
} from "./types";

import {
    CapabilityRegistry
} from "./contracts";

import {
    CapabilityAlreadyExistsError,
    CapabilityNotFoundError
} from "./errors";

export class InMemoryCapabilityRegistry
implements CapabilityRegistry {

    private readonly capabilities =
        new Map<string, Capability>();

    async register(
        capability: Capability
    ): Promise<void> {

        const name =
            capability.metadata.name;

        if (this.capabilities.has(name)) {

            throw new CapabilityAlreadyExistsError(name);

        }

        this.capabilities.set(
            name,
            capability
        );

    }

    async unregister(
        name: string
    ): Promise<void> {

        if (!this.capabilities.delete(name)) {

            throw new CapabilityNotFoundError(name);

        }

    }

    async get(
        name: string
    ): Promise<Capability | undefined> {

        return this.capabilities.get(name);

    }

    async list(): Promise<Capability[]> {

        return [...this.capabilities.values()];

    }

}