import Ajv from "ajv";

import schema
from "../schemas/composition.schema.json";

import {
    Composition
} from "./types";

import {
    CompositionValidationError
} from "./errors";

const ajv = new Ajv();

const validate = ajv.compile(schema);

export class DefaultCompositionValidator {

    async validate(
        composition: Composition
    ): Promise<void> {

        const valid = validate(composition);

        if (!valid) {
            throw new CompositionValidationError(
                ajv.errorsText(validate.errors)
            );
        }
    }

}