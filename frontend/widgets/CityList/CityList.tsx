"use client";

import { useCityStore } from "@/entities/city/model/store";
import WeatherCard from "@/entities/weather/ui/WeatherCard";
import { useEffect } from "react";

export default function CityList() {
    const cities = useCityStore(s => s.cities);
    const load = useCityStore(s => s.load);
    const remove = useCityStore(s => s.remove);

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            {cities.map(city => (
                <div key={city.id} className="bg-gray-900 p-3">
                    <div className="flex gap-3 items-center">
                        <h3>NAME: {city.name}</h3>
                        <button
                            className="bg-red-600 p-0"
                            onClick={() => remove(city.id)}
                        >
                            DEL
                        </button>
                    </div>

                    <WeatherCard city={city.name} />
                </div>
            ))}
        </>
    );
}