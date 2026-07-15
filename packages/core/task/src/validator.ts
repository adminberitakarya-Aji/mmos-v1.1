import Ajv from "ajv";

import schema
from "../schemas/task.schema.json";

import { Task } from "./types";

import {
  TaskValidationError
} from "./errors";

const ajv = new Ajv();

const validate = ajv.compile(schema);

export class DefaultTaskValidator {

  async validate(
    task: Task
  ): Promise<void> {

    const valid = validate(task);

    if (!valid) {

      throw new TaskValidationError(
        ajv.errorsText(validate.errors)
      );

    }

  }

}