import { Injectable } from '@nestjs/common';

import { Forecast } from '@/domain/entities/weather.forecast.entity';
import { Weather } from '@/domain/entities/weather.entity';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { PrismaService } from '@/infrastructure/prisma';

import { CityMapper } from '../mappers/city.mapper';
import { WeatherMapper } from '../mappers/weather.mapper';

@Injectable()
export class PrismaWeatherRepository extends WeatherRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findByCity(city: string): Promise<Forecast | null> {
    const weather = await this.prisma.weather.findMany({
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

    if (weather.length === 0) {
      return null;
    }

    return new Forecast(
      CityMapper.toDomain(weather[0].city),
      weather.map((item) => WeatherMapper.toDomain(item)),
    );
  }

  async upsertForecast(cityId: string, weather: Weather[]): Promise<void> {
    for (const item of weather) {
      const data = WeatherMapper.toPersistence(item);

      await this.prisma.weather.upsert({
        where: {
          cityId_day: {
            cityId,
            day: item.day,
          },
        },
        update: data,
        create: data,
      });
    }
  }

  async markAsStale(cityId: string): Promise<void> {
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
