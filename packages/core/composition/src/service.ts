import {
    CompositionRepository,
    CompositionValidator,
    CompositionService
} from "./contracts";

import {
    Composition
} from "./types";

export class DefaultCompositionService
implements CompositionService {

    constructor(
        private readonly repository: CompositionRepository,
        private readonly validator: CompositionValidator
    ) {}

    async create(
        composition: Composition
    ) {

        await this.validator.validate(composition);

        await this.repository.save(composition);
    }

    async update(
        composition: Composition
    ) {

        await this.validator.validate(composition);

        await this.repository.update(composition);
    }

    async publish(id: string) {

        const composition =
            await this.repository.findById(id);

        if (!composition) {
            throw new Error("Composition not found");
        }

        composition.status = {
            state: "published",
            publishedAt: new Date().toISOString()
        };

        await this.repository.update(composition);
    }

    async delete(id: string) {
        await this.repository.delete(id);
    }

    async get(id: string) {
        return this.repository.findById(id);
    }

    async list() {
        return this.repository.list();
    }
}