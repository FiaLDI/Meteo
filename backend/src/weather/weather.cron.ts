import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherApiService } from './weather.api';

@Injectable()
export class WeatherCron {
  constructor(
    private readonly prisma: PrismaService,
    private readonly api: WeatherApiService,
  ) {}

  @Cron('*/10 * * * *')
  async updateWeather() {
    const cities = await this.prisma.city.findMany();

    for (const city of cities) {
      try {
        const weather = await this.api.getWeather(
          city.latitude,
          city.longitude,
        );

        await this.prisma.weather.create({
          data: {
            cityId: city.id,
            date: new Date(weather.daily.time[0]),
            min: weather.daily.temperature_2m_min[0],
            max: weather.daily.temperature_2m_max[0],
            wind: weather.daily.wind_speed_10m_max[0],
            isStale: false,
          },
        });
      } catch {
        const last = await this.prisma.weather.findFirst({
          where: {
            cityId: city.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!last) {
          continue;
        }

        await this.prisma.weather.create({
          data: {
            cityId: city.id,
            date: last.date,
            min: last.min,
            max: last.max,
            wind: last.wind,
            isStale: true,
          },
        });
      }
    }
  }
}
