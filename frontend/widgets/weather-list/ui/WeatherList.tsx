"use client";

import { useActiveCity } from "@/entities/city";
import { WeatherCard } from "@/entities/weather";

export const WeatherList = () => {
    const city = useActiveCity();

    return (
        <div className="bg-gray-700 min-h-screen col-span-2 ">
            <h1 className="bg-gray-900 p-3 text-2xl">Meteo</h1>

            {!city ? (
                <div className="p-6 text-gray-300">
                    Add a city to see the forecast.
                </div>
            ) : (
                <WeatherCard city={city.name} />
            )}
        </div>
    );
};
