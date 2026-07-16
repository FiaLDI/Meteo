import { Weather } from '../entities/weather.entity';
import { Forecast } from '../entities/weather.forecast.entity';

export abstract class WeatherRepository {
  abstract findByCity(city: string): Promise<Forecast | null>;

  abstract upsertForecast(cityId: string, weather: Weather[]): Promise<void>;

  abstract markAsStale(cityId: string): Promise<void>;
}
