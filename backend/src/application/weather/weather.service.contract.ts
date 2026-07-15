import { GetWeatherResponseDto } from "@/application/weather/weather.dto";

export abstract class WeatherServiceContract {
  abstract getWeather(city: string): Promise<GetWeatherResponseDto>
}
