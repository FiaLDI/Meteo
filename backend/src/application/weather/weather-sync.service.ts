import { Injectable } from '@nestjs/common';
import { WeatherApiService } from '@/infrastructure/open-meteo';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { CityRepository } from '../../domain/repositories/city.repository';
import { Weather } from '@/domain/entities/weather.entity';

@Injectable()
export class WeatherSyncService {
  private readonly FORECAST_DAYS = 14;

  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly api: WeatherApiService,
    private readonly cityRepository: CityRepository
  ) {}

  async syncCity(cityId: string) {
    const city = await this.cityRepository.findById(cityId);

    if (!city) {
      return;
    }

    try {
      const weather = await this.api.getForecast(
        city.latitude,
        city.longitude,
        this.FORECAST_DAYS,
      );

      for (let day = 0; day < weather.daily.time.length; day++) {
        const forecast = weather.daily.time.map((_, day) =>
          Weather.create({
            cityId: city.id,
            day,
            date: new Date(weather.daily.time[day]),
            min: weather.daily.temperature_2m_min[day],
            max: weather.daily.temperature_2m_max[day],
            wind: weather.daily.wind_speed_10m_max[day],
            weatherCode: weather.daily.weather_code[day],
          }),
        );

        await this.weatherRepository.upsertForecast(city.id, forecast);
      }
    } catch {
      await this.weatherRepository.markAsStale(city.id);
    }
  }

  async syncAllCities() {
    const cities = await this.cityRepository.findAllDesc()

    for (const city of cities) {
      await this.syncCity(city.id);
    }
  }
}
