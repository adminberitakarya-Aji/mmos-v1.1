import {
    Agent,
} from "./types";

import {
    AgentRegistry
} from "./contracts";

import {
    AgentAlreadyExistsError,
    AgentNotFoundError
} from "./errors";

export class InMemoryAgentRegistry
implements AgentRegistry {

    private readonly agents =
        new Map<string, Agent>();

    async register(
        agent: Agent
    ): Promise<void> {

        if (this.agents.has(agent.metadata.name)) {

            throw new AgentAlreadyExistsError(
                agent.metadata.name
            );

        }

        this.agents.set(
            agent.metadata.name,
            agent
        );

    }

    async unregister(
        name: string
    ): Promise<void> {

        if (!this.agents.delete(name)) {

            throw new AgentNotFoundError(name);

        }

    }

    async get(
        name: string
    ): Promise<Agent | undefined> {

        return this.agents.get(name);

    }

    async list(): Promise<Agent[]> {

        return [...this.agents.values()];

    }

}