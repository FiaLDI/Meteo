import { create } from "zustand";
import { CityApi  } from "./api";
import { Store } from "./types";


export const useCityStore = create<Store>((set, get) => ({
    cities: [],

    async load() {
        const cities = await CityApi.getAll();
        set({ cities });
    },

    async add(city) {
        await CityApi.create(city);
        await get().load();
    },

    async remove(id) {
        await CityApi.remove(id);
        await get().load();
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
