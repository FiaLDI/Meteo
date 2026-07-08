
export interface Weather {
    city: string;
    day: number;
    date: string;
    min: number;
    max: number;
    wind: number;
    isStale: boolean;
}

export interface FetchWeatherParams {
    city: string;
    day: number;
}
