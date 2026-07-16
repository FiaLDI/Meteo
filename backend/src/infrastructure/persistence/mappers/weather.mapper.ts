import { Weather as PrismaWeather } from '@prisma/client';
import { Weather } from '@/domain/entities/weather.entity';

export class WeatherMapper {
  static toDomain(weather: PrismaWeather): Weather {
    return Weather.restore(weather);
  }

  static toPersistence(weather: Weather) {
    return {
      cityId: weather.cityId,
      day: weather.day,
      date: weather.date,
      min: weather.min,
      max: weather.max,
      wind: weather.wind,
      weatherCode: weather.weatherCode,
      isStale: weather.isStale,
    };
  }
}
