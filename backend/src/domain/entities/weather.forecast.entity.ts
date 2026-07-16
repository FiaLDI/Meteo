import { City } from "./city.entity";
import { Weather } from "./weather.entity";

export class Forecast {
  constructor(
    public readonly city: City,
    public readonly days: Weather[],
  ) {}
}
