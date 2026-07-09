import { create } from "zustand";
import { persist } from "zustand/middleware";

import { WeatherApi } from "./api";
import { WeatherResponse } from "./types";

interface WeatherStore {
    weather: Record<string, WeatherResponse>;
    loading: Record<string, boolean>;
    errors: Record<string, string | null>;

    loadWeather(city: string): Promise<void>;
}

export const useWeatherStore = create<WeatherStore>()(
    persist(
        (set, get) => ({
            weather: {},
            loading: {},
            errors: {},

            async loadWeather(city) {
                // Не загружаем повторно, если данные уже есть
                if (get().weather[city]) {
                    return;
                }

                set((state) => ({
                    loading: {
                        ...state.loading,
                        [city]: true,
                    },
                    errors: {
                        ...state.errors,
                        [city]: null,
                    },
                }));

                try {
                    const weather = await WeatherApi.fetchWeather(city);

                    set((state) => ({
                        weather: {
                            ...state.weather,
                            [city]: weather,
                        },
                        loading: {
                            ...state.loading,
                            [city]: false,
                        },
                        errors: {
                            ...state.errors,
                            [city]: null,
                        },
                    }));
                } catch (e) {
                    set((state) => ({
                        loading: {
                            ...state.loading,
                            [city]: false,
                        },
                        errors: {
                            ...state.errors,
                            [city]:
                                e instanceof Error
                                    ? e.message
                                    : "Unknown error",
                        },
                    }));
                }
            },
        }),
        {
            name: "weather-store",
            version: 3,
        }
    )
);
