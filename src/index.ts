/**
 * Gentech Agents
 * 
 * Multi-agent orchestration framework with ERC-8004 identity,
 * x402 payments, and human-in-the-loop.
 * 
 * @packageDocumentation
 */

// Core types
export * from './types';

// Agent team
export { AgentTeam } from './orchestrator/team';

// Orchestrator
export { Orchestrator } from './orchestrator/orchestrator';

// Agents
export { BaseAgent } from './agents/base';
export { CoderAgent } from './agents/coder';
export { StrategistAgent } from './agents/strategist';
export { ContentAgent } from './agents/content';

// Registry (ERC-8004)
export { AgentRegistry } from './registry/registry';

// Communication
export { MessageBus } from './communication/bus';

// Human loop
export { HumanLoop } from './human-loop/loop';

// Version
export const VERSION = '0.1.0';
