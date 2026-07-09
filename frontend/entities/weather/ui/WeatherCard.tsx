"use client";

import { useEffect, useState } from "react";
import { useWeatherStore } from "../model/store";
import { ViewMode } from "../model/types";
import { ForecastList } from "./ForecastList";
import { ForecastSelect } from "./ForecastSelect";

interface WeatherCardProps {
    city: string;
}

export const WeatherCard = ({
    city,
}: WeatherCardProps) => {
    const [mode, setMode] = useState<ViewMode>("today");

    const { weather, loading, errors, loadWeather } = useWeatherStore();

    useEffect(() => {
        loadWeather(city);
    }, [city, loadWeather]);

    return (
        <div className="p-6 flex flex-col gap-3">
            <h2 className="text-xl font-semibold">
                {city}
            </h2>

            <ForecastSelect
                value={mode}
                onChange={setMode}
            />

            {loading[city] && <p>Loading...</p>}

            {errors[city] && (
                <p className="text-red-500">
                    {errors[city]}
                </p>
            )}
    
            {!loading[city] && !errors[city] && (
                <ForecastList
                    forecast={weather[city]?.forecast}
                    mode={mode}
                />
            )}
        </div>
    );
};
