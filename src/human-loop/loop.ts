/**
 * Human Loop — Hire humans via EarnFi + x402
 */

import { HumanLoopConfig, HireRequest, HireResult, HumanSubmission } from '../types';

export class HumanLoop {
  private config: HumanLoopConfig;

  constructor(config: HumanLoopConfig) {
    this.config = config;
  }

  /**
   * Hire humans for a task
   */
  async hire(request: HireRequest): Promise<HireResult> {
    // Placeholder — in production, this would call EarnFi API
    console.log(`[HumanLoop] Hiring ${request.slots} humans for: ${request.task}`);
    console.log(`[HumanLoop] Reward: ${request.reward} ${this.config.payment.token}`);

    // Simulate hiring
    const submissions: HumanSubmission[] = [];
    for (let i = 0; i < request.slots; i++) {
      submissions.push({
        userId: `human-${Date.now()}-${i}`,
        output: { status: 'completed' },
        rating: undefined,
        feedback: undefined,
      });
    }

    return {
      requestId: `hire-${Date.now()}`,
      submissions,
    };
  }

  /**
   * Get payment info
   */
  getPaymentInfo(): { token: string; network: string } {
    return {
      token: this.config.payment.token,
      network: this.config.payment.network,
    };
  }

  /**
   * Check if provider is supported
   */
  isSupported(provider: string): boolean {
    return ['earnfi', 'wurk'].includes(provider);
  }
}
