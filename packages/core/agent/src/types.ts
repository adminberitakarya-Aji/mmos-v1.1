export interface Agent {

    apiVersion: string;

    kind: "Agent";

    metadata: AgentMetadata;

    spec: AgentSpec;

    status?: AgentStatus;

}

export interface AgentMetadata {

    name: string;

    version: string;

    description?: string;

    author?: string;

    tags?: string[];

}

export interface AgentSpec {

    role: string;

    provider: string;

    model: string;

    systemPrompt?: string;

    temperature?: number;

    maxTokens?: number;

    planning?: PlanningStrategy;

    memory?: MemoryConfiguration;

    capabilities: string[];

    tools?: string[];

}

export interface PlanningStrategy {

    strategy:
        | "reactive"
        | "planning"
        | "reasoning"
        | "reflection";

    maxIterations?: number;

}

export interface MemoryConfiguration {

    working?: boolean;

    semantic?: boolean;

    episodic?: boolean;

    vector?: boolean;

    cache?: boolean;

}

export interface AgentStatus {

    state:
        | "draft"
        | "validated"
        | "registered"
        | "available"
        | "deprecated";

}