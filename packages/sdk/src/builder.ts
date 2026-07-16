/**
 * MMOS SDK Builder
 *
 * Builder utilities for constructing workflows and compositions.
 */

export interface WorkflowBuilderOptions {
  name: string;
  description?: string;
  version?: string;
}

export class WorkflowBuilder {
  private tasks: Array<{
    name: string;
    type: string;
    config: Record<string, unknown>;
    dependencies?: string[];
  }> = [];
  private options: WorkflowBuilderOptions;

  constructor(options: WorkflowBuilderOptions) {
    this.options = options;
  }

  addTask(task: {
    name: string;
    type: string;
    config: Record<string, unknown>;
    dependencies?: string[];
  }): this {
    this.tasks.push(task);
    return this;
  }

  build(): { workflow: WorkflowBuilderOptions; tasks: Array<{
    name: string;
    type: string;
    config: Record<string, unknown>;
    dependencies?: string[];
  }> } {
    return {
      workflow: this.options,
      tasks: this.tasks,
    };
  }

  static create(options: WorkflowBuilderOptions): WorkflowBuilder {
    return new WorkflowBuilder(options);
  }
}

export function createWorkflowBuilder(options: WorkflowBuilderOptions): WorkflowBuilder {
  return new WorkflowBuilder(options);
}
