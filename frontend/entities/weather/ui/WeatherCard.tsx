"use client";

import { useEffect } from "react";
import { useWeatherStore } from "../model/store";

interface Props {
    city: string;
}

export default function WeatherCard({ city }: Props) {

    const {
        weather,
        isLoading,
        isError,
        error,
        loadWeather,
    } = useWeatherStore();

    useEffect(() => {
        loadWeather(city);
    }, [city, loadWeather]);

    if (isLoading)
        return <p>Loading...</p>;

    if (isError)
        return <p>{error}</p>;

    if (!weather)
        return <p>No weather</p>;

    return (
        <div>
            <p>{weather.date}</p>
            <p>{weather.min}°</p>
            <p>{weather.max}°</p>
            <p>{weather.wind} м/с</p>

            {weather.isStale && (
                <p>⚠ Weather service unavailable</p>
            )}
        </div>
    );
}
