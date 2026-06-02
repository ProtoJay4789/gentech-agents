# Getting Started

## Installation

```bash
npm install aae-agents
```

## Quick Start

### 1. Create a Team

```typescript
import { AgentTeam } from 'aae-agents';

const team = new AgentTeam({
  agents: [
    { role: 'coder', tools: ['terminal', 'file'] },
    { role: 'strategist', tools: ['web', 'terminal'] },
    { role: 'content', tools: ['web', 'terminal'] },
  ],
});
```

### 2. Execute a Task

```typescript
const result = await team.execute({
  id: 'task-1',
  description: 'Build a DeFi monitoring dashboard',
  assignTo: ['coder', 'content'],
});

// Result is a Map<AgentRole, TaskResult>
for (const [role, result] of result) {
  console.log(`${role}: ${result.status}`);
}
```

### 3. Add Human-in-the-Loop

```typescript
import { HumanLoop } from 'aae-agents';

const humanLoop = new HumanLoop({
  provider: 'earnfi',
  payment: { token: 'USDC', network: 'solana' },
});

// Hire humans for a task
const hireResult = await humanLoop.hire({
  task: 'Review this landing page design',
  reward: 0.025,
  slots: 3,
});

console.log(hireResult.submissions); // 3 human submissions
```

## Next Steps

- [Agent Roles](./agent-roles.md) — Learn about specialized agents
- [Human Loop](./human-loop.md) — Hire humans via x402
- [ERC-8004 Identity](./erc-8004.md) — Register agents on-chain
- [Examples](../examples/) — See more usage patterns
