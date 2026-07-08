import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getWeather(
    city: string,
    day = 0,
  ) {
    if (day < 0 || day > 13) {
      throw new BadRequestException(
        'day must be between 0 and 13',
      );
    }

    const weather = await this.prisma.weather.findFirst({
      where: {
        day,
        city: {
          name: city,
        },
      },
      include: {
        city: true,
      },
    });

    if (!weather) {
      throw new NotFoundException(
        'Weather not found',
      );
    }

    return {
      city: weather.city.name,
      day: weather.day,
      date: weather.date,
      min: weather.min,
      max: weather.max,
      wind: weather.wind,
      isStale: weather.isStale,
    };
  }
}
