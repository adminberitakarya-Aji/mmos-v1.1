export class CapabilityError
extends Error {}

export class CapabilityNotFoundError
extends CapabilityError {

    constructor(name: string) {

        super(
            `Capability '${name}' not found.`
        );

    }

}

export class CapabilityAlreadyExistsError
extends CapabilityError {

    constructor(name: string) {

        super(
            `Capability '${name}' already exists.`
        );

    }

}

export class InvalidCapabilityError
extends CapabilityError {}

export class InvalidCapabilityCategoryError
extends CapabilityError {}

export class CapabilityExecutionError
extends CapabilityError {}