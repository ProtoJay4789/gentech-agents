/**
 * Base Agent — Abstract class for all AAE agents
 */

import { AgentConfig, AgentRole, Task, TaskResult, ToolCategory } from '../types';

export abstract class BaseAgent {
  public readonly id: string;
  public readonly role: AgentRole;
  public readonly name: string;
  public readonly tools: ToolCategory[];
  protected metadata: Record<string, unknown>;

  constructor(config: AgentConfig) {
    this.id = config.id || `agent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.role = config.role;
    this.name = config.name || `${config.role}-${this.id.slice(-6)}`;
    this.tools = config.tools;
    this.metadata = config.metadata || {};
  }

  /**
   * Execute a task
   */
  abstract execute(task: Task): Promise<TaskResult>;

  /**
   * Check if agent can handle a task
   */
  canHandle(task: Task): boolean {
    return task.assignTo.includes(this.role);
  }

  /**
   * Get agent capabilities
   */
  getCapabilities(): string[] {
    return this.tools.map(t => `tool:${t}`);
  }

  /**
   * Serialize agent for storage
   */
  toJSON(): AgentConfig {
    return {
      id: this.id,
      role: this.role,
      name: this.name,
      tools: this.tools,
      metadata: this.metadata,
    };
  }
}
