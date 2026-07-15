import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeatherService } from '../../application/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
  ) {}

  @Get(':city')
  getWeather(
    @Param('city') city: string,
  ) {
    return this.weatherService.getWeather(city);
  }
}
