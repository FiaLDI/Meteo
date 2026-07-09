"use client";

import { CityCardProps } from "../model/types";

export const CityCard = ({ children, remove, city } : CityCardProps) => {

    return (
        <div className="bg-gray-900 p-3">
            <div className="flex gap-3 items-center">
                <h3>NAME: {city.name}</h3>
                <button
                    className="bg-red-600 p-0"
                    onClick={() => remove(city.id)}
                >
                    DEL
                </button>
            </div>

            {children}
        </div>
    )
}