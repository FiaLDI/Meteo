"use client";

import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudRain,
    CloudSnow,
    CloudLightning,
} from "lucide-react";

interface WeatherIconProps {
    code: number;
    className?: string;
}

export function WeatherIcon({
    code,
    className = "size-10",
}: WeatherIconProps) {
    // Clear sky
    if (code === 0) {
        return <Sun className={className} />;
    }

    // Mainly clear / partly cloudy
    if (code === 1 || code === 2) {
        return <CloudSun className={className} />;
    }

    // Overcast
    if (code === 3) {
        return <Cloud className={className} />;
    }

    // Fog
    if (code === 45 || code === 48) {
        return <CloudFog className={className} />;
    }

    // Drizzle / Rain
    if (
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
    ) {
        return <CloudRain className={className} />;
    }

    // Snow
    if (
        [71, 73, 75, 77, 85, 86].includes(code)
    ) {
        return <CloudSnow className={className} />;
    }

    // Thunderstorm
    if (
        [95, 96, 99].includes(code)
    ) {
        return <CloudLightning className={className} />;
    }

    return <Cloud className={className} />;
}
