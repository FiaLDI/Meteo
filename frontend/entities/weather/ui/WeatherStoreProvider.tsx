"use client";

import { useRef } from "react";
import { Weather } from "../model/types";
import { useWeatherStore } from "../model/store";

export function WeathertoreProvider({
  weather,
  children,
}: {
  weather: Weather | null;
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useWeatherStore.setState({ weather });
    initialized.current = true;
  }

  return children;
}
