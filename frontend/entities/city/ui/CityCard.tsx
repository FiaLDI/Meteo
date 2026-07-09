"use client";

import { Trash2 } from "lucide-react";
import { CityCardProps } from "../model/types";

export const CityCard = ({
    active,
    remove,
    city,
    isActive,
}: CityCardProps) => {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => remove(city.id)}
                className="rounded-md bg-red-600 p-2 text-white transition hover:bg-red-700"
                aria-label={`Delete ${city.name}`}
            >
                <Trash2 size={18} />
            </button>

            <button
                type="button"
                onClick={() => active(city.id)}
                className="w-full flex-1 rounded-lg bg-gray-900 p-3 text-left transition hover:bg-gray-800 data-[active=true]:bg-gray-600"
                data-active={isActive}
            >
                <h3 className="font-medium">
                    {city.name}
                </h3>
            </button>
        </div>
    );
};
