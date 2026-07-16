import { City } from './city.entity';
import { Weather } from './weather.entity';

export class WeatherWithCity {
  constructor(
    public readonly city: City,
    public readonly weather: Weather,
  ) {}
}
