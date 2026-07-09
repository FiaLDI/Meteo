import { create } from "zustand";
import { CityApi  } from "./api";
import { Store } from "./types";


export const useCityStore = create<Store>((set, get) => ({
    activeCityId: null,
    cities: [],

    async load() {
        const cities = await CityApi.getAll();
        const current = get().activeCityId;

        set({
            cities,
            activeCityId:
                cities.some(city => city.id === current)
                    ? current
                    : cities[0]?.id ?? null,
        });
    },

    async add(city) {
        await CityApi.create(city);
        await get().load();
    },

    async remove(id) {
        await CityApi.remove(id);
        await get().load();
    },

    setActive(id) {
        set({activeCityId: id})
    },

    search: [],

    async searchCities(text) {
        if (!text.trim()) {
            set({ search: [] });
            return;
        }

        const result = await CityApi.search(text);

        set({
            search: result,
        });
    },

    clearSearch() {
        set({
            search: [],
        });
    },
}));
