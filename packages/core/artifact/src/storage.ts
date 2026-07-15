import {
    Artifact
} from "./types";

import {
    ArtifactStorage
} from "./contracts";

export abstract class BaseArtifactStorage
implements ArtifactStorage {

    abstract exists(
        artifact: Artifact
    ): Promise<boolean>;

    abstract store(
        artifact: Artifact
    ): Promise<Artifact>;

    abstract retrieve(
        uri: string
    ): Promise<Artifact>;

    abstract remove(
        uri: string
    ): Promise<void>;

}