# Basic Orchestration Example

This example shows how to create a team and execute tasks.

```typescript
import { AgentTeam } from 'aae-agents';

async function main() {
  // Create a team with specialized agents
  const team = new AgentTeam({
    agents: [
      { role: 'coder', tools: ['terminal', 'file'] },
      { role: 'strategist', tools: ['web', 'terminal'] },
      { role: 'content', tools: ['web', 'terminal'] },
    ],
  });

  // Execute a task
  const result = await team.execute({
    id: 'task-1',
    description: 'Research and implement a price feed',
    assignTo: ['strategist', 'coder'],
  });

  // Print results
  for (const [role, taskResult] of result) {
    console.log(`${role}: ${taskResult.status}`);
  }
}

main().catch(console.error);
```

## Running the Example

```bash
cd examples/basic-orchestration
npm install
npx ts-node index.ts
```
