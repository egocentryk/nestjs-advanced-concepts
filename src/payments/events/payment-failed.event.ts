import { ContextId } from '@nestjs/core'

export class PaymentFailedEvent {
  static readonly key = 'PAYMEND_FAILED'

  constructor(
    public readonly paymentId: number,
    public readonly meta: { contextId: ContextId },
  ) {}
}
