export interface WeatherDay {
    day: number;
    date: string;
    min: number;
    max: number;
    wind: number;
    isStale: boolean;
    weatherCode: number,
}

export interface WeatherResponse {
    city: string;
    forecast: WeatherDay[];
}