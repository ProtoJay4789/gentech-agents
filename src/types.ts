/**
 * AAE Agents — Core Types
 * 
 * Multi-agent orchestration framework with ERC-8004 identity,
 * x402 payments, and human-in-the-loop.
 */

/** Agent roles */
export type AgentRole = 'orchestrator' | 'coder' | 'strategist' | 'content' | 'custom';

/** Tool categories */
export type ToolCategory = 'terminal' | 'file' | 'browser' | 'web' | 'mcp' | 'custom';

/** Agent configuration */
export interface AgentConfig {
  id?: string;
  role: AgentRole;
  name?: string;
  tools: ToolCategory[];
  handler?: (task: Task) => Promise<TaskResult>;
  metadata?: Record<string, unknown>;
}

/** Task definition */
export interface Task {
  id: string;
  description: string;
  assignTo: AgentRole[];
  metadata?: Record<string, unknown>;
  deadline?: Date;
  budget?: number; // USDC
}

/** Task result */
export interface TaskResult {
  taskId: string;
  agentId: string;
  output: unknown;
  status: 'success' | 'failure' | 'partial';
  metadata?: Record<string, unknown>;
}

/** Team configuration */
export interface TeamConfig {
  agents: AgentConfig[];
  orchestrator?: OrchestratorConfig;
  humanLoop?: HumanLoopConfig;
}

/** Orchestrator configuration */
export interface OrchestratorConfig {
  mcp?: boolean;
  mcpServer?: string;
  maxConcurrentTasks?: number;
}

/** Human loop configuration */
export interface HumanLoopConfig {
  provider: 'earnfi' | 'wurk';
  payment: {
    token: 'USDC' | 'USDT';
    network: 'solana' | 'base' | 'ethereum';
  };
  maxRetries?: number;
}

/** ERC-8004 agent identity */
export interface AgentIdentity {
  address: string;
  chainId: number;
  name: string;
  role: AgentRole;
  reputation: number;
  metadata: Record<string, unknown>;
}

/** Human hire request */
export interface HireRequest {
  task: string;
  reward: number;
  slots: number;
  requirements?: string[];
  deadline?: Date;
}

/** Human hire result */
export interface HireResult {
  requestId: string;
  submissions: HumanSubmission[];
}

/** Human submission */
export interface HumanSubmission {
  userId: string;
  output: unknown;
  rating?: number;
  feedback?: string;
}
