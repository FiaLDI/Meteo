import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { WeatherServiceContract } from '@/application/weather/weather.service.contract';

@Injectable()
export class WeatherService extends WeatherServiceContract {
  constructor(
    private readonly weatherRepository: WeatherRepository,
  ) {
    super();
  }

  async getWeather(city: string) {
    const weather = await this.weatherRepository.findByCity(city);

    if (!weather.length) {
      throw new NotFoundException('Weather not found');
    }

    return {
      city: weather[0].city.name,
      forecast: weather.map((item) => ({
        day: item.day,
        date: item.date,
        min: item.min,
        max: item.max,
        wind: item.wind,
        isStale: item.isStale,
        weatherCode: item.weatherCode,
      })),
    };
  }
}
