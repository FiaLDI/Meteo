import { useCityStore } from "./store";

export const useActiveCity = () =>
    useCityStore(state =>
        state.cities.find(city => city.id === state.activeCityId) ?? null
    );