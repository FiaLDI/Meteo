"use client";

import { useEffect, useState } from "react";
import { useWeatherStore } from "../model/store";

interface Props {
    city: string;
}

export default function WeatherCard({ city }: Props) {
    const [day, setDay] = useState(0);

    const weather = useWeatherStore((s) => s.weather);
    const loading = useWeatherStore((s) => s.loading);
    const errors = useWeatherStore((s) => s.errors);
    const loadWeather = useWeatherStore((s) => s.loadWeather);

    useEffect(() => {
        loadWeather(city, day);
    }, [city, day]);

    const current = weather?.[city]?.[day];
    const isLoading = loading?.[city]?.[day];
    const error = errors?.[city]?.[day];

    return (
        <div className="mt-3 flex flex-col gap-2">

            <select
                className="border rounded p-1"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
            >
                {Array.from({ length: 14 }, (_, i) => (
                    <option key={i} value={i}>
                        {i + 1} day
                    </option>
                ))}
            </select>

            {isLoading && <p>Loading...</p>}

            {!isLoading && error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}

            {!isLoading && !error && current && (
                <>
                    <p>Date: {current.date}</p>
                    <p>Min: {current.min}°</p>
                    <p>Max: {current.max}°</p>
                    <p>Wind: {current.wind} м/с</p>

                    {current.isStale && (
                        <p className="text-yellow-500">
                            ⚠ Cached weather
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
