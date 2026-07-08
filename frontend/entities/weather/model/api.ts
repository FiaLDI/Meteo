import { fetchFromApi } from "@/shared/api/client";
import { FetchWeatherParams, Weather } from "./types";

export const WeatherApi = {
    fetchWeather(params: FetchWeatherParams) {
        return fetchFromApi<Weather>(
            `/weather/${encodeURIComponent(params.city)}?day=${params.day}`
        );
    },
};
