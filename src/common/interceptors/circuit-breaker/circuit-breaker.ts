import { CallHandler } from '@nestjs/common'
import { tap, throwError } from 'rxjs'

const SUCCESS_THRESHOLD = 3 // Number of successful calls to consider the circuit as closed
const FAILURE_THRESHOLD = 3 // Number of failed calls to consider the circuit as open
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state = CircuitBreakerState.Closed
  private failureCount = 0
  private successCount = 0
  private lastError: Error
  private nextAttempt: number

  exec(next: CallHandler) {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt > Date.now()) {
        return throwError(() => this.lastError)
      }

      this.state = CircuitBreakerState.HalfOpen
    }

    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      }),
    )
  }

  private handleSuccess() {
    this.failureCount = 0
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++
    }
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++

      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.successCount = 0
        this.state = CircuitBreakerState.Closed
      }
    }
  }

  private handleError(err: Error) {
    this.failureCount++
    if (
      this.failureCount >= FAILURE_THRESHOLD ||
      this.state === CircuitBreakerState.HalfOpen
    ) {
      this.state = CircuitBreakerState.Open
      this.lastError = err
      this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME
    }
  }
}
