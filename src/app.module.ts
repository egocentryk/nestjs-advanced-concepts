import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [
    CoffeesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    SchedulerModule,
    CronModule,
    FibonacciModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
