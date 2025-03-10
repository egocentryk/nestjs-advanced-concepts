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
import { PaymentsModule } from './payments/payments.module'
import { DataSourceModule } from './data-source/data-source.module'
import { UsersModule } from './users/users.module'
import { ContextIdFactory } from '@nestjs/core'
import { I18nModule } from './i18n/i18n.module'
import { AggregateByLocaleContextIdStrategy } from './core/aggregate-by-locale.strategy'

ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy())

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
    DataSourceModule,
    UsersModule,
    I18nModule,
    // Alternatively, we can use the `forRootAsync` method to register the module with dynamic options
    // HttpClientModule.forRootAsync({
    //   useFactory: () => ({ baseUrl: 'https://nestjs.com' }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
