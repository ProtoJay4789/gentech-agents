# Gentech Agents

**Build agent teams, not just agents.**

A multi-agent orchestration framework with specialized roles, ERC-8004 identity, x402 payments, and human-in-the-loop via EarnFi.

> 🎮 Think AgentRQ meets EarnFi meets multiplayer gaming.

## Why Gentech Agents?

Most agent frameworks focus on single agents. Gentech Agents is built for **teams** — specialized agents working together with humans, coordinated by an orchestrator, paid via micropayments.

```
┌─────────────────────────────────────────────────────────┐
│                    Gentech Agents                            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   HQ     │  │  Labs    │  │ Strategy │  │Content   ││
│  │(Orchest.)│  │ (Code)   │  │(Finance) │  │(Social)  ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘│
│       │              │              │              │      │
│       └──────────────┴──────────────┴──────────────┘      │
│                         │                                │
│                    ┌────┴────┐                           │
│                    │Human Loop│  ← EarnFi + x402         │
│                    └─────────┘                           │
└─────────────────────────────────────────────────────────┘
```

## Features

- **Multi-Agent Teams** — Specialized roles (coder, strategist, content) with defined toolsets
- **ERC-8004 Identity** — On-chain agent identity and reputation
- **x402 Payments** — Micropayments via Solana USDC
- **Human-in-the-Loop** — Hire humans via EarnFi for tasks agents can't do
- **MCP Integration** — Works with Model Context Protocol servers
- **Game UI** — Multiplayer lobby for hiring agents and humans

## Quick Start

```bash
npm install gentech-agents
```

```typescript
import { AgentTeam, Orchestrator } from 'gentech-agents';

// Create a team with specialized agents
const team = new AgentTeam({
  agents: [
    { role: 'coder', tools: ['terminal', 'file', 'browser'] },
    { role: 'strategist', tools: ['web', 'terminal'] },
    { role: 'content', tools: ['web', 'terminal'] },
  ],
  orchestrator: new Orchestrator({ mcp: true }),
});

// Execute a task
const result = await team.execute({
  task: 'Build a DeFi monitoring dashboard',
  assignTo: ['coder', 'content'],
});

console.log(result); // { code: '...', content: '...' }
```

## Agent Roles

| Role | Purpose | Tools |
|------|---------|-------|
| `orchestrator` | Coordinate agents, manage tasks | All |
| `coder` | Write code, debug, deploy | terminal, file, browser |
| `strategist` | Research, analysis, decisions | web, terminal |
| `content` | Create content, social media | web, terminal |
| `custom` | Define your own role | Configurable |

## Human-in-the-Loop

When agents need human judgment, creativity, or real-world execution:

```typescript
import { HumanLoop } from 'gentech-agents';

const loop = new HumanLoop({
  provider: 'earnfi', // or 'wurk'
  payment: { token: 'USDC', network: 'solana' },
});

// Agent hires a human for a task
const result = await loop.hire({
  task: 'Review this landing page design',
  reward: 0.025, // USDC
  slots: 3, // hire 3 humans
});

console.log(result.reviews); // [{ user: '...', rating: 5, feedback: '...' }]
```

## Bring Your Own Agent

The framework is open source. Use our agents or bring your own:

```typescript
import { AgentTeam } from 'gentech-agents';

const team = new AgentTeam({
  agents: [
    { role: 'my-custom-agent', handler: myAgentFn },
  ],
});
```

**Note:** BYOA works for basic orchestration. To unlock x402 payments, EarnFi hiring, and reputation tracking, use our full stack.

## What's Open Source vs Premium

| Feature | Open Source | Premium |
|---------|-------------|---------|
| Agent framework | ✅ | ✅ |
| Basic orchestration | ✅ | ✅ |
| MCP integration | ✅ | ✅ |
| ERC-8004 identity | ✅ | ✅ |
| x402 payments | ❌ | ✅ |
| EarnFi human hiring | ❌ | ✅ |
| Reputation system | ❌ | ✅ |
| Game UI | ❌ | ✅ |
| Pre-built agents | ❌ | ✅ |

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Agent Roles](./docs/agent-roles.md)
- [Human Loop](./docs/human-loop.md)
- [ERC-8004 Identity](./docs/erc-8004.md)
- [Contributing](./docs/contributing.md)

## Examples

- [Basic Orchestration](./examples/basic-orchestration/)
- [Human Hiring](./examples/human-hiring/)
- [Multi-Agent Task](./examples/multi-agent-task/)

## License

MIT — use it, build on it, ship it.

## Built by

[GenTech Labs](https://github.com/ProtoJay4789) — Building the agent economy.
