import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from './coffees/coffees.module'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { SchedulerModule } from './scheduler/scheduler.module'
import { CronModule } from './cron/cron.module'
import { FibonacciModule } from './fibonacci/fibonacci.module'
import { HttpClientModule } from './http-client/http-client.module'
import { TagsModule } from './tags/tags.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoffeesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    SchedulerModule,
    CronModule,
    FibonacciModule,
    HttpClientModule.register({
      baseUrl: 'https://nestjs.com',
      isGlobal: true,
      // isGlobal is an extra option, that can be used to modify the auto-generated module definition,
      // but they are not registered as part of the options object or provider
    }),
    TagsModule,
    PaymentsModule,
    // Alternatively, we can use the `forRootAsync` method to register the module with dynamic options
    // HttpClientModule.forRootAsync({
    //   useFactory: () => ({ baseUrl: 'https://nestjs.com' }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
