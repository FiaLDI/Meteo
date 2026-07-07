import { create } from "zustand";
import { CityApi, City } from "./api";

interface Store {
    cities: City[];

    load(): Promise<void>;

    add(city: Omit<City, "id">): Promise<void>;

    remove(id: string): Promise<void>;
}

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

    }

}));
