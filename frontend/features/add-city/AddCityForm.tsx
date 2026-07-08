"use client";

import { useEffect, useState } from "react";
import { useCityStore } from "@/entities/city/model/store";

export default function AddCityForm() {
    const add = useCityStore((s) => s.add);
    const search = useCityStore((s) => s.search);
    const searchCities = useCityStore((s) => s.searchCities);
    const clearSearch = useCityStore((s) => s.clearSearch);

    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            searchCities(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, searchCities]);

    return (
        <div className="border p-3 rounded flex flex-col gap-2">
            <h2 className="font-semibold">Add city</h2>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Start typing city..."
                className="border p-2 rounded"
            />

            {search.length > 0 && (
                <div className="border rounded overflow-hidden">
                    {search.map((city) => (
                        <button
                            key={`${city.name}-${city.latitude}-${city.longitude}`}
                            type="button"
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                            onClick={async () => {
                                await add(city.name);

                                setQuery("");

                                clearSearch();
                            }}
                        >
                            <div className="font-medium">
                                {city.name}
                            </div>

                            <div className="text-xs text-gray-500">
                                {city.latitude}, {city.longitude}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
