"use client";

import { ViewMode } from "@/entities/weather";

interface ForecastSelectProps {
    value: ViewMode;
    onChange(value: ViewMode): void;
}

const options: {
    value: ViewMode;
    label: string;
}[] = [
    { value: "today", label: "Today" },
    { value: "3", label: "3 days" },
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
];

export const ForecastSelect = ({
    value,
    onChange,
}: ForecastSelectProps) => {
    return (
        <div className="inline-flex overflow-hidden">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
                        value === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};