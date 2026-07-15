import { Capability } from "./types";

export interface CapabilityRegistry {

    register(
        capability: Capability
    ): Promise<void>;

    unregister(
        name: string
    ): Promise<void>;

    get(
        name: string
    ): Promise<Capability | undefined>;

    list(): Promise<Capability[]>;

}