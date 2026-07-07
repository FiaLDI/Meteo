import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiService } from './weather.api';
import { WeatherCron } from './weather.cron';

@Module({
  controllers: [WeatherController],
  providers: [
    WeatherService,
    WeatherApiService,
    WeatherCron,
  ],
  exports: [WeatherService],
})
export class WeatherModule {}
