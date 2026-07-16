/**
 * MMOS Workflow — builder.
 *
 * Fluent helper for composing `Workflow` objects. Optional; `Workflow`
 * objects can also be created directly from the type.
 */

import type { Workflow, WorkflowAction } from "./types";
import type { WorkflowBuilder } from "./contracts";

export class DefaultWorkflowBuilder implements WorkflowBuilder {
  private id = "";
  private name = "";
  private version = "1.0.0";
  private description: string | undefined;
  private displayName: string | undefined;
  private actions: WorkflowAction[] = [];

  reset(): WorkflowBuilder {
    this.id = "";
    this.name = "";
    this.version = "1.0.0";
    this.description = undefined;
    this.displayName = undefined;
    this.actions = [];
    return this;
  }

  setId(id: string): WorkflowBuilder {
    this.id = id;
    return this;
  }

  setName(name: string): WorkflowBuilder {
    this.name = name;
    return this;
  }

  setVersion(version: string): WorkflowBuilder {
    this.version = version;
    return this;
  }

  setDisplayName(displayName: string): WorkflowBuilder {
    this.displayName = displayName;
    return this;
  }

  setDescription(description: string): WorkflowBuilder {
    this.description = description;
    return this;
  }

  addAction(action: WorkflowAction): WorkflowBuilder {
    this.actions.push(action);
    return this;
  }

  build(): Workflow {
    if (!this.id) throw new Error("WorkflowBuilder: id is required");
    if (!this.name) throw new Error("WorkflowBuilder: name is required");
    if (!this.version) throw new Error("WorkflowBuilder: version is required");
    if (this.actions.length === 0) throw new Error("WorkflowBuilder: at least one action is required");

    return {
      id: this.id,
      name: this.name,
      version: this.version,
      ...(this.displayName !== undefined ? { displayName: this.displayName } : {}),
      ...(this.description !== undefined ? { description: this.description } : {}),
      actions: this.actions,
    };
  }
}
