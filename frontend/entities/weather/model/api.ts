import { fetchFromApi } from "@/shared/api/client";
import { WeatherResponse } from "./types";

export const WeatherApi = {
    fetchWeather(city: string) {
        return fetchFromApi<WeatherResponse>(
            `/weather/${encodeURIComponent(city)}`
        );
    },
};
