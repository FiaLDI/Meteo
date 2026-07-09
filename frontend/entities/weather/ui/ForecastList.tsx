"use client";

import { WeatherDay, ViewMode } from "../model/types";
import { WeatherDayCard } from "./WeatherDayCard";

interface ForecastListProps {
    forecast?: WeatherDay[];
    mode: ViewMode;
}

export const ForecastList = ({
    forecast,
    mode,
}: ForecastListProps) => {
    if (!forecast) {
        return null;
    }

    const items = (() => {
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
    })();

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {items.map((item, index) => (
                <WeatherDayCard
                    key={item.day}
                    item={item}
                    index={index}
                />
            ))}
        </div>
    );
};
