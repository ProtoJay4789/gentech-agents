/**
 * Orchestrator — Coordinates agent teams and task execution
 */

import { OrchestratorConfig, Task, TaskResult, AgentRole } from '../types';
import { BaseAgent } from '../agents/base';

export class Orchestrator {
  private config: OrchestratorConfig;
  private taskQueue: Task[] = [];
  private results: Map<string, TaskResult[]> = new Map();

  constructor(config: OrchestratorConfig = {}) {
    this.config = {
      mcp: true,
      maxConcurrentTasks: 5,
      ...config,
    };
  }

  /**
   * Assign task to appropriate agents
   */
  async assign(task: Task, agents: BaseAgent[]): Promise<BaseAgent[]> {
    return agents.filter(agent => agent.canHandle(task));
  }

  /**
   * Execute task with assigned agents
   */
  async execute(task: Task, agents: BaseAgent[]): Promise<TaskResult[]> {
    const assigned = await this.assign(task, agents);
    const results: TaskResult[] = [];

    // Execute in parallel (with concurrency limit)
    const promises = assigned.map(agent => agent.execute(task));
    const settled = await Promise.allSettled(promises);

    for (const result of settled) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        console.error(`Agent failed: ${result.reason}`);
      }
    }

    this.results.set(task.id, results);
    return results;
  }

  /**
   * Get results for a task
   */
  getResults(taskId: string): TaskResult[] | undefined {
    return this.results.get(taskId);
  }

  /**
   * Check if orchestrator supports MCP
   */
  supportsMCP(): boolean {
    return this.config.mcp === true;
  }
}
