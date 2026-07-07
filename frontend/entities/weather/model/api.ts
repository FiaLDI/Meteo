import { fetchFromApi } from "@/shared/api/client";
import { FetchWeatherParams, Weather } from "./types";

export const WeatherApi = {

    async fetchWeather(params: FetchWeatherParams) {
        return fetchFromApi<Weather>(
            `/weather/${params.city}`,
        );
    }
}