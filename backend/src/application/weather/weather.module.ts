import { Module } from '@nestjs/common';
import { WeatherController } from '../../api/v1/weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiService } from '@/infrastructure/open-meteo';
import { WeatherCron } from '../../infrastructure/scheduler/weather.cron';
import { WeatherSyncService } from './weather-sync.service';
import { CityRepository } from '../../domain/repositories/city.repository';
import { PrismaCityRepository } from '../../infrastructure/persistence/prisma/prisma-city.repository';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { PrismaWeatherRepository } from '../../infrastructure/persistence/prisma/prisma-weather.repositrory';
import { WeatherServiceContract } from './weather.service.contract';

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
    {
      provide: WeatherServiceContract,
      useClass: WeatherService,
    },   
    WeatherApiService,
    WeatherSyncService,
    WeatherCron,
  ],
  exports: [WeatherServiceContract, WeatherSyncService],
})
export class WeatherModule {}
