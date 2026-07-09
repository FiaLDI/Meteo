"use client";

import { useEffect, useState } from "react";
import { useWeatherStore } from "../model/store";

export const WeatherCard = ({ city }: {
    city: string;
}) => {
    const [day, setDay] = useState(0);

    const {weather, loading, errors, loadWeather} = useWeatherStore();

    useEffect(() => {
        loadWeather(city, day);
    }, [loadWeather, city, day]);

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
                {Array.from({ length: 14 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);

                    let label: string;

                    if (i === 0) {
                        label = "Today";
                    } else if (i === 1) {
                        label = "Tomorrow";
                    } else {
                        label = date.toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                        });
                    }

                    return (
                        <option key={i} value={i}>
                            {label}
                        </option>
                    );
                })}
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
