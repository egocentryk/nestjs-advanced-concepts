import { DiscoveryService, Reflector, MetadataScanner } from '@nestjs/core'
import { IntervalScheduler } from './interval.scheduler'

describe('IntervalScheduler', () => {
  it('should be defined', () => {
    const discoveryService = {} as DiscoveryService
    const reflector = {} as Reflector
    const metadataScanner = {} as MetadataScanner

    expect(
      new IntervalScheduler(discoveryService, reflector, metadataScanner),
    ).toBeDefined()
  })
})
