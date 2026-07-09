"use client";

import { WeatherIcon } from "@/shared";
import { WeatherDay } from "../model/types";

interface WeatherDayCardProps {
    item: WeatherDay;
    index: number;
}

export const WeatherDayCard = ({
    item,
    index,
}: WeatherDayCardProps) => {
    const label =
        index === 0
            ? "Today"
            : index === 1
            ? "Tomorrow"
            : new Date(item.date).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
              });

    return (
        <div className="rounded-lg border p-4 shadow-sm w-62.5">
            <div className="mb-4 flex items-center gap-4">
                <WeatherIcon
                    code={item.weatherCode}
                    className="size-12"
                />

                <div>
                    <h3 className="font-semibold">
                        {label}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString("ru-RU")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Min</p>
                    <p>{item.min}°</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Max</p>
                    <p>{item.max}°</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p>{item.wind} м/с</p>
                </div>
            </div>

            {item.isStale && (
                <p className="mt-3 text-sm text-yellow-500">
                    ⚠ Cached weather
                </p>
            )}
        </div>
    );
};
