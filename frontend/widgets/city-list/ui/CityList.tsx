"use client";

import { CityCard, useCityStore } from "@/entities/city";
import { AddCityForm } from "@/features/add-city";
import { useEffect } from "react";

export const CityList = () => {
    const { activeCityId, cities, remove, setActive, load } = useCityStore();

    useEffect(() => {
        load();
    }, [load]);
    
    return (
        <div className="flex flex-col bg-gray-900 p-6">
            <AddCityForm />
            {cities.map(city => <CityCard 
                key={city.id} 
                city={city} 
                remove={remove} 
                active={setActive}
                isActive={activeCityId === city.id}
            /> 
            )}

        </div>
    )
}
