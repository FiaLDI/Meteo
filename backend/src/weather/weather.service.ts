import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getWeather(city: string) {
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
        day: "asc",
      },
    });

    if (weather.length === 0) {
      throw new NotFoundException("Weather not found");
    }

    return {
      city: weather[0].city.name,
      forecast: weather.map((item) => ({
        day: item.day,
        date: item.date,
        min: item.min,
        max: item.max,
        wind: item.wind,
        isStale: item.isStale,
      })),
    };
  }
}
