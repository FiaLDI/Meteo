import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiService } from '@/infrastructure/open-meteo';
import { WeatherCron } from './weather.cron';
import { WeatherSyncService } from './weather-sync.service';
import { CityRepository } from '../city/city.repository';
import { PrismaCityRepository } from '../city/prisma-city.repository';
import { WeatherRepository } from './weather.repository';
import { PrismaWeatherRepository } from './prisma-weather.repositrory';

@Module({
  controllers: [WeatherController],
  providers: [
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: WeatherRepository,
      useClass: PrismaWeatherRepository,
    },
    WeatherService,
    WeatherApiService,
    WeatherSyncService,
    WeatherCron,
  ],
  exports: [WeatherService, WeatherSyncService],
})
export class WeatherModule {}
