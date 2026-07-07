
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Weather } from "./types";
import { WeatherApi } from "./api";

interface WeatherStore {
    weather: Weather | null ;
    isLoading: boolean;
    isError: boolean;
    error: string;
    loadWeather(city: string): Promise<void>;
}


export const useWeatherStore = create<WeatherStore>()(
    persist(
        (set, get) => ({
            weather: null,
            isLoading: false,
            isError: false,
            error: "",
            

            loadWeather: async (city: string) => {
                set({
                    isLoading: true,
                    isError: false,
                    error: "",
                });

                try {

                    const weather =
                        await WeatherApi.fetchWeather({
                            city,
                        });

                    set({
                        weather,
                        isLoading: false,
                    });

                } catch (e) {

                    set({
                        isLoading: false,
                        isError: true,
                        error: e instanceof Error ? e.message : "Unknown error",
                    });

                }
            },
        }),
        {
            name: "weather-store",
        }
    )
)
