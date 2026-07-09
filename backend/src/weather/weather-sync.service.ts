import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherApiService } from './weather-api.service';

@Injectable()
export class WeatherSyncService {
  private readonly FORECAST_DAYS = 14;

  constructor(
    private readonly prisma: PrismaService,
    private readonly api: WeatherApiService,
  ) {}

  async syncCity(cityId: string) {
    const city = await this.prisma.city.findUnique({
      where: { id: cityId },
    });

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
        await this.prisma.weather.upsert({
          where: {
            cityId_day: {
              cityId: city.id,
              day,
            },
          },
          update: {
            date: new Date(weather.daily.time[day]),
            min: weather.daily.temperature_2m_min[day],
            max: weather.daily.temperature_2m_max[day],
            wind: weather.daily.wind_speed_10m_max[day],
            weatherCode: weather.daily.weather_code[day],
            isStale: false,
          },
          create: {
            cityId: city.id,
            day,
            weatherCode: weather.daily.weather_code[day],
            date: new Date(weather.daily.time[day]),
            min: weather.daily.temperature_2m_min[day],
            max: weather.daily.temperature_2m_max[day],
            wind: weather.daily.wind_speed_10m_max[day],
            isStale: false,
          },
        });
      }
    } catch {
      await this.prisma.weather.updateMany({
        where: {
          cityId: city.id,
        },
        data: {
          isStale: true,
        },
      });
    }
  }

  async syncAllCities() {
    const cities = await this.prisma.city.findMany();

    for (const city of cities) {
      await this.syncCity(city.id);
    }
  }
}
