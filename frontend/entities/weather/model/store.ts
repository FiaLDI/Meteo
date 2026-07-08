import { create } from "zustand";
import { persist } from "zustand/middleware";

import { WeatherApi } from "./api";
import { Weather } from "./types";

interface WeatherStore {
    weather: Record<string, Record<number, Weather>>;
    loading: Record<string, Record<number, boolean>>;
    errors: Record<string, Record<number, string | null>>;

    loadWeather(city: string, day: number): Promise<void>;
}

export const useWeatherStore = create<WeatherStore>()(
    persist(
        (set) => ({
            weather: {},
            loading: {},
            errors: {},

            async loadWeather(city, day) {
                set((state) => ({
                    loading: {
                        ...state.loading,
                        [city]: {
                            ...state.loading[city],
                            [day]: true,
                        },
                    },
                }));

                try {
                    const weather = await WeatherApi.fetchWeather({
                        city,
                        day,
                    });

                    set((state) => ({
                        weather: {
                            ...state.weather,
                            [city]: {
                                ...state.weather[city],
                                [day]: weather,
                            },
                        },

                        loading: {
                            ...state.loading,
                            [city]: {
                                ...state.loading[city],
                                [day]: false,
                            },
                        },

                        errors: {
                            ...state.errors,
                            [city]: {
                                ...state.errors[city],
                                [day]: null,
                            },
                        },
                    }));
                } catch (e) {
                    set((state) => ({
                        loading: {
                            ...state.loading,
                            [city]: {
                                ...state.loading[city],
                                [day]: false,
                            },
                        },

                        errors: {
                            ...state.errors,
                            [city]: {
                                ...state.errors[city],
                                [day]:
                                    e instanceof Error
                                        ? e.message
                                        : "Unknown error",
                            },
                        },
                    }));
                }
            },
        }),
        {
            name: "weather-store",
            version: 2,
        }
    )
);
