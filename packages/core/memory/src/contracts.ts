import { Memory } from "./types";

export interface MemoryManager {

    put(
        memory: Memory
    ): Promise<void>;

    get(
        namespace: string,
        key: string
    ): Promise<Memory | undefined>;

    delete(
        namespace: string,
        key: string
    ): Promise<void>;

    list(
        namespace?: string
    ): Promise<Memory[]>;

}