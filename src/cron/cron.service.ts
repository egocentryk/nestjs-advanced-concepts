import { Interval } from 'src/scheduler/decorators/interval.decorator'
import { IntervalHost } from '../scheduler/decorators/interval-host.decorator'

@IntervalHost
export class CronService {
  // @Interval(10000)
  everySecond() {
    console.log('This will be logged every 10 seconds!')
  }
}
