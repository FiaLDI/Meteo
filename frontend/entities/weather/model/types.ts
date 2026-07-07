
export interface Weather {
    city: string;
    date: string;
    min: number;
    max: number;
    wind: number;
    isStale: boolean;
}

export interface FetchWeatherParams {
    city?: string;
}