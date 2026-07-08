import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiService } from './weather-api.service';
import { WeatherCron } from './weather.cron';
import { WeatherSyncService } from './weather-sync.service';

@Module({
  controllers: [WeatherController],
  providers: [
    WeatherService,
    WeatherApiService,
    WeatherSyncService,
    WeatherCron,
  ],
  exports: [WeatherService, WeatherSyncService],
})
export class WeatherModule {}
