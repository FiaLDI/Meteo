import { Injectable } from '@nestjs/common';
import { WeatherRepository } from '../../domain/repositories/weather.repository';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaWeatherRepository extends WeatherRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findByCity(city: string) {
    return this.prisma.weather.findMany({
      where: {
        city: {
          name: city,
        },
      },
      include: {
        city: true,
      },
      orderBy: {
        day: 'asc',
      },
    });
  }

  async upsertForecast(
    cityId: string,
    forecast: {
      day: number;
      date: Date;
      min: number;
      max: number;
      wind: number;
      weatherCode: number;
    }[],
  ) {
    for (const item of forecast) {
      await this.prisma.weather.upsert({
        where: {
          cityId_day: {
            cityId,
            day: item.day,
          },
        },
        update: {
          date: item.date,
          min: item.min,
          max: item.max,
          wind: item.wind,
          weatherCode: item.weatherCode,
          isStale: false,
        },
        create: {
          cityId,
          day: item.day,
          date: item.date,
          min: item.min,
          max: item.max,
          wind: item.wind,
          weatherCode: item.weatherCode,
          isStale: false,
        },
      });
    }
  }

  async markAsStale(cityId: string) {
    await this.prisma.weather.updateMany({
      where: {
        cityId,
      },
      data: {
        isStale: true,
      },
    });
  }
}
