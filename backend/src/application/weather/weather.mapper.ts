import { Forecast } from "@/domain/entities/weather.forecast.entity";
import { GetWeatherResponseDto } from "./weather.dto";

export class WeatherApplicationMapper {
  static toResponse(forecast: Forecast): GetWeatherResponseDto {
    return {
      city: forecast.city.name,
      forecast: forecast.days.map((weather) => ({
        day: weather.day,
        date: weather.date,
        min: weather.min,
        max: weather.max,
        wind: weather.wind,
        isStale: weather.isStale,
        weatherCode: weather.weatherCode,
      })),
    };
  }
}
