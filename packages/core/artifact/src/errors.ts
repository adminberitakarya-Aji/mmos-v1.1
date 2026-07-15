export class ArtifactError
extends Error {}

export class ArtifactNotFoundError
extends ArtifactError {

    constructor(uri: string) {

        super(
            `Artifact '${uri}' not found.`
        );

    }

}

export class ArtifactAlreadyExistsError
extends ArtifactError {

    constructor(uri: string) {

        super(
            `Artifact '${uri}' already exists.`
        );

    }

}

export class InvalidArtifactTypeError
extends ArtifactError {}

export class InvalidArtifactUriError
extends ArtifactError {}

export class ArtifactStorageError
extends ArtifactError {}