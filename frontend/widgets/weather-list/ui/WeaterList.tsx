"use client";

import { useEffect } from "react";
import { AddCityForm } from "@/features/add-city";
import { WeatherCard } from "@/entities/weather";
import { useCityStore } from "@/entities/city";
import { CityCard } from "@/entities/city/ui/CityCard";

export const WeaterList = () => {
    const { cities, load, remove } = useCityStore();

    useEffect(() => {
        load();
    }, [load]);

    return (
        <div className="bg-gray-700 h-screen">
            <h1 className="bg-gray-900 p-3 text-2xl">Meteo</h1>

            <AddCityForm />
            
            {cities.map(city => <CityCard key={city.id} city={city} remove={remove}><WeatherCard city={city.name} /></CityCard> )}
        </div>
    );
}