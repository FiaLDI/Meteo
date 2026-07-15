import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CityModule } from './application/city/city.module';
import { WeatherModule } from './application/weather/weather.module';
import { ConfigModule } from '@/infrastructure/config';
import { PrismaModule } from '@/infrastructure/prisma';

@Module({
  imports: [
    ConfigModule,
    ScheduleModule.forRoot(),
    PrismaModule,
    CityModule,
    WeatherModule,
  ],
})
export class AppModule {}
