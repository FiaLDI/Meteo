import { Forecast } from '@/domain/entities/weather.forecast.entity';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { PrismaService } from '@/infrastructure/prisma';
import { Injectable } from '@nestjs/common';
import { CityMapper } from '../mappers/city.mapper';
import { WeatherMapper } from '../mappers/weather.mapper';
import { Weather } from '@/domain/entities/weather.entity';

@Injectable()
export class PrismaWeatherRepository extends WeatherRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findByCity(city: string) {
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

    if (!weather.length) {
      return null;
    }

    return new Forecast(
      CityMapper.toDomain(weather[0].city),
      weather.map(WeatherMapper.toDomain),
    );
  }

  async upsertForecast(cityId: string, weather: Weather[]) {
    for (const item of weather) {
      await this.prisma.weather.upsert({
        where: {
          cityId_day: {
            cityId,
            day: item.day,
          },
        },
        update: {
          ...WeatherMapper.toPersistence(item),
        },
        create: {
          ...WeatherMapper.toPersistence(item),
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
