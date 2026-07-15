export class MemoryError
extends Error {}

export class MemoryNotFoundError
extends MemoryError {

    constructor(
        namespace: string,
        key: string
    ) {

        super(
            `Memory '${namespace}/${key}' not found.`
        );

    }

}

export class MemoryAlreadyExistsError
extends MemoryError {

    constructor(
        namespace: string,
        key: string
    ) {

        super(
            `Memory '${namespace}/${key}' already exists.`
        );

    }

}

export class InvalidMemoryTypeError
extends MemoryError {}

export class MemoryExpiredError
extends MemoryError {}

export class MemoryProviderError
extends MemoryError {}