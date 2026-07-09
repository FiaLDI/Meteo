"use client";

import { useEffect, useMemo, useState } from "react";
import { useWeatherStore } from "../model/store";

type ViewMode = "today" | "3" | "7" | "14";

export const WeatherCard = ({
    city,
}: {
    city: string;
}) => {
    const [mode, setMode] = useState<ViewMode>("today");

    const { weather, loading, errors, loadWeather } = useWeatherStore();

    useEffect(() => {
        loadWeather(city);
    }, [city, loadWeather]);

    const forecast = weather?.[city]?.forecast;
    const isLoading = loading?.[city];
    const error = errors?.[city];

    const items = useMemo(() => {
        if (!forecast) return [];

        switch (mode) {
            case "today":
                return forecast.slice(0, 1);
            case "3":
                return forecast.slice(0, 3);
            case "7":
                return forecast.slice(0, 7);
            case "14":
                return forecast;
        }
    }, [forecast, mode]);

    return (
        <div className="mt-3 flex flex-col gap-3">
            <select
                className="border rounded p-1"
                value={mode}
                onChange={(e) => setMode(e.target.value as ViewMode)}
            >
                <option value="today">Today</option>
                <option value="3">Next 3 days</option>
                <option value="7">Next 7 days</option>
                <option value="14">Next 14 days</option>
            </select>

            {isLoading && <p>Loading...</p>}

            {!isLoading && error && (
                <p className="text-red-500">{error}</p>
            )}

            {!isLoading &&
                !error &&
                items.map((item, index) => {
                    let label: string;

                    if (index === 0) {
                        label = "Today";
                    } else if (index === 1) {
                        label = "Tomorrow";
                    } else {
                        label = new Date(item.date).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                        });
                    }

                    return (
                        <div
                            key={item.day}
                            className="rounded border p-3"
                        >
                            <h3 className="mb-2 font-semibold">
                                {label}
                            </h3>

                            <p>Date: {item.date}</p>
                            <p>Min: {item.min}°</p>
                            <p>Max: {item.max}°</p>
                            <p>Wind: {item.wind} м/с</p>

                            {item.isStale && (
                                <p className="text-yellow-500">
                                    ⚠ Cached weather
                                </p>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};
