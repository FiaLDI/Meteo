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