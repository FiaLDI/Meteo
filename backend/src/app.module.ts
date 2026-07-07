import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './prisma/prisma.module';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    CityModule,
    WeatherModule,
  ],
})
export class AppModule {}
