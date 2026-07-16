import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { WeatherServiceContract } from './weather.service.contract';
import { WeatherApplicationMapper } from './weather.mapper';

@Injectable()
export class WeatherService extends WeatherServiceContract {
  constructor(private readonly weatherRepository: WeatherRepository) {
    super();
  }

  async getWeather(city: string) {
    const forecast = await this.weatherRepository.findByCity(city);

    if (!forecast) {
      throw new NotFoundException('Weather not found');
    }

    return WeatherApplicationMapper.toResponse(forecast);
  }
}
