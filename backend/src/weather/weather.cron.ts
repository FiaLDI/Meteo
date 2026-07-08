import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { WeatherSyncService } from './weather-sync.service';

@Injectable()
export class WeatherCron {
  constructor(
    private readonly weatherSync: WeatherSyncService,
  ) {}

  @Cron('*/10 * * * *')
  async updateWeather() {
    await this.weatherSync.syncAllCities();
  }
}
