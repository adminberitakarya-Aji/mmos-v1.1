import { Agent } from "./types";

export interface AgentRegistry {

    register(
        agent: Agent
    ): Promise<void>;

    unregister(
        name: string
    ): Promise<void>;

    get(
        name: string
    ): Promise<Agent | undefined>;

    list(): Promise<Agent[]>;

}