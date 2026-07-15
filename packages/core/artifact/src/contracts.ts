import { Artifact } from "./types";

export interface ArtifactStorage {

    exists(
        artifact: Artifact
    ): Promise<boolean>;

    store(
        artifact: Artifact
    ): Promise<Artifact>;

    retrieve(
        uri: string
    ): Promise<Artifact>;

    remove(
        uri: string
    ): Promise<void>;

}