import { Injectable } from '@nestjs/common';
import { ForecastResponse } from '../../weather/weather.dto';

@Injectable()
export class WeatherApiService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  async getForecast(latitude: number, longitude: number, days: number = 1): Promise<ForecastResponse> {

      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max',
        forecast_days: days.toString(),
        timezone: 'auto',
      });

      const url = `${this.baseUrl}?${params}`;
      

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Weather API unavailable');
      }

      return response.json();
  }
}
