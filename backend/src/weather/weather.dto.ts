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
}

interface ForecastDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  wind_speed_10m_max: number[];
}
