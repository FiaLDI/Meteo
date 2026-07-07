import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherApiService {
  async getWeather(latitude: number, longitude: number) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max` +
      `&forecast_days=1` +
      `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather API unavailable');
    }

    return response.json();
  }
}
