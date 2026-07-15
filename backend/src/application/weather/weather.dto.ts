export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  daily_units: ForecastDailyUnits;
  daily: ForecastDaily;
}

interface ForecastDailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  wind_speed_10m_max: string;
  weather_code: number;
}

interface ForecastDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  wind_speed_10m_max: number[];
  weather_code: number;
}

export interface ForecastDto {
    day: number;
    date: Date;
    min: number;
    max: number;
    wind: number;
    isStale: boolean;
    weatherCode: number;
}

export interface GetWeatherResponseDto {
    city: string;
    forecast: ForecastDto[];
}