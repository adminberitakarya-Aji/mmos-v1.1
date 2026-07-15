export class AgentError
extends Error {}

export class AgentNotFoundError
extends AgentError {

    constructor(name: string) {

        super(
            `Agent '${name}' not found.`
        );

    }

}

export class AgentAlreadyExistsError
extends AgentError {

    constructor(name: string) {

        super(
            `Agent '${name}' already exists.`
        );

    }

}

export class InvalidAgentRoleError
extends AgentError {}

export class InvalidCapabilityError
extends AgentError {}

export class InvalidProviderError
extends AgentError {}