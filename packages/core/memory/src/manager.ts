import { Memory } from "./types";

import { MemoryManager } from "./contracts";

export abstract class BaseMemoryManager
implements MemoryManager {

    abstract put(
        memory: Memory
    ): Promise<void>;

    abstract get(
        namespace: string,
        key: string
    ): Promise<Memory | undefined>;

    abstract delete(
        namespace: string,
        key: string
    ): Promise<void>;

    abstract list(
        namespace?: string
    ): Promise<Memory[]>;

}