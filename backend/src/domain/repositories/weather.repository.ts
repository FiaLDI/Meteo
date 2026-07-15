import { Prisma } from '@prisma/client';

export type WeatherWithCity = Prisma.WeatherGetPayload<{
  include: {
    city: true;
  };
}>;

export abstract class WeatherRepository {
  abstract findByCity(city: string): Promise<WeatherWithCity[]>;

  abstract upsertForecast(
    cityId: string,
    forecast: {
      day: number;
      date: Date;
      min: number;
      max: number;
      wind: number;
      weatherCode: number;
    }[],
  ): Promise<void>;

  abstract markAsStale(cityId: string): Promise<void>;
}
