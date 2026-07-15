import { Composition } from "./types";

export interface CompositionRepository {

    save(
        composition: Composition
    ): Promise<void>;

    update(
        composition: Composition
    ): Promise<void>;

    delete(
        id: string
    ): Promise<void>;

    findById(
        id: string
    ): Promise<Composition | null>;

    list(): Promise<Composition[]>;
}

export interface CompositionValidator {

    validate(
        composition: Composition
    ): Promise<void>;
}

export interface CompositionService {

    create(
        composition: Composition
    ): Promise<void>;

    update(
        composition: Composition
    ): Promise<void>;

    publish(
        id: string
    ): Promise<void>;

    delete(
        id: string
    ): Promise<void>;

    get(
        id: string
    ): Promise<Composition | null>;

    list(): Promise<Composition[]>;
}