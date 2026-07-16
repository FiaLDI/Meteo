import { Injectable } from '@nestjs/common';

import { Weather } from '@/domain/entities/weather.entity';
import { CityRepository } from '@/domain/repositories/city.repository';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { WeatherApiService } from '@/infrastructure/open-meteo';

@Injectable()
export class WeatherSyncService {
  private readonly FORECAST_DAYS = 14;

  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly api: WeatherApiService,
    private readonly cityRepository: CityRepository,
  ) {}

  async syncCity(cityId: string): Promise<void> {
    const city = await this.cityRepository.findById(cityId);

    if (!city) {
      return;
    }

    try {
      const forecastResponse = await this.api.getForecast(
        city.latitude,
        city.longitude,
        this.FORECAST_DAYS,
      );

      const { daily } = forecastResponse;

      const forecast = daily.time.map((_, day) =>
        Weather.create({
          cityId: city.id,
          day,
          date: new Date(daily.time[day]),
          min: daily.temperature_2m_min[day],
          max: daily.temperature_2m_max[day],
          wind: daily.wind_speed_10m_max[day],
          weatherCode: daily.weather_code[day],
        }),
      );

      await this.weatherRepository.upsertForecast(city.id, forecast);
    } catch {
      await this.weatherRepository.markAsStale(city.id);
    }
  }

  async syncAllCities(): Promise<void> {
    const cities = await this.cityRepository.findAllDesc();

    for (const city of cities) {
      await this.syncCity(city.id);
    }
  }
}
