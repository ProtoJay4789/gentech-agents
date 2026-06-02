/**
 * AgentTeam — Manages a team of agents
 */

import { TeamConfig, Task, TaskResult, AgentConfig, AgentRole } from '../types';
import { BaseAgent } from '../agents/base';
import { Orchestrator } from './orchestrator';
import { CoderAgent } from '../agents/coder';
import { StrategistAgent } from '../agents/strategist';
import { ContentAgent } from '../agents/content';

export class AgentTeam {
  private agents: BaseAgent[] = [];
  private orchestrator: Orchestrator;

  constructor(config: TeamConfig) {
    // Create agents from config
    for (const agentConfig of config.agents) {
      const agent = this.createAgent(agentConfig);
      this.agents.push(agent);
    }

    // Create orchestrator
    this.orchestrator = new Orchestrator(config.orchestrator);
  }

  /**
   * Create agent from config
   */
  private createAgent(config: AgentConfig): BaseAgent {
    switch (config.role) {
      case 'coder':
        return new CoderAgent(config);
      case 'strategist':
        return new StrategistAgent(config);
      case 'content':
        return new ContentAgent(config);
      default:
        // Custom agent — use base class with handler
        return new (class extends BaseAgent {
          async execute(task: Task): Promise<TaskResult> {
            if (config.handler) {
              return config.handler(task);
            }
            return {
              taskId: task.id,
              agentId: this.id,
              output: { status: 'unhandled' },
              status: 'partial',
            };
          }
        })(config);
    }
  }

  /**
   * Execute a task with the team
   */
  async execute(task: Task): Promise<Map<AgentRole, TaskResult>> {
    const results = await this.orchestrator.execute(task, this.agents);
    const roleResults = new Map<AgentRole, TaskResult>();

    for (const result of results) {
      const agent = this.agents.find(a => a.id === result.agentId);
      if (agent) {
        roleResults.set(agent.role, result);
      }
    }

    return roleResults;
  }

  /**
   * Get all agents in the team
   */
  getAgents(): BaseAgent[] {
    return [...this.agents];
  }

  /**
   * Get agent by role
   */
  getAgentByRole(role: AgentRole): BaseAgent | undefined {
    return this.agents.find(a => a.role === role);
  }

  /**
   * Add agent to team
   */
  addAgent(config: AgentConfig): void {
    this.agents.push(this.createAgent(config));
  }

  /**
   * Remove agent from team
   */
  removeAgent(agentId: string): void {
    this.agents = this.agents.filter(a => a.id !== agentId);
  }
}
