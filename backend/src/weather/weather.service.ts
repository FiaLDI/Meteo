import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}

  async getWeather(city: string) {
    const weather = await this.prisma.weather.findFirst({
      where: {
        city: {
          name: city,
        },
      },
      include: {
        city: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!weather) {
      throw new NotFoundException('City not found');
    }

    return {
      city: weather.city.name,
      date: weather.date,
      min: weather.min,
      max: weather.max,
      wind: weather.wind,
      isStale: weather.isStale,
    };
  }
}
