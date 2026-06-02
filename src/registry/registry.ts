/**
 * Agent Registry — ERC-8004 identity and discovery
 */

import { AgentIdentity, AgentRole } from '../types';

export class AgentRegistry {
  private agents: Map<string, AgentIdentity> = new Map();

  /**
   * Register an agent on-chain
   */
  async register(identity: AgentIdentity): Promise<string> {
    // Placeholder — in production, this would call ERC-8004 contract
    this.agents.set(identity.address, identity);
    return identity.address;
  }

  /**
   * Get agent by address
   */
  async getAgent(address: string): Promise<AgentIdentity | undefined> {
    return this.agents.get(address);
  }

  /**
   * Search agents by role
   */
  async searchByRole(role: AgentRole): Promise<AgentIdentity[]> {
    return Array.from(this.agents.values()).filter(a => a.role === role);
  }

  /**
   * Update agent reputation
   */
  async updateReputation(address: string, score: number): Promise<void> {
    const agent = this.agents.get(address);
    if (agent) {
      agent.reputation = score;
    }
  }

  /**
   * List all registered agents
   */
  async list(): Promise<AgentIdentity[]> {
    return Array.from(this.agents.values());
  }
}
