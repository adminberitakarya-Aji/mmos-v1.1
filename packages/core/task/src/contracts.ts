import { Task } from "./types";

export interface TaskValidator {

  validate(
    task: Task
  ): Promise<void>;

}