import { fetchFromApi } from "@/shared/api/client";
import { City, CitySearchResult } from "./types";



export const CityApi = {
    getAll() {
        return fetchFromApi<City[]>("/cities");
    },

    create(name: string) {
        return fetchFromApi<City, { name: string }>("/cities", {
            method: "POST",
            body: { name },
        });
    },

    search(name: string) {
        return fetchFromApi<CitySearchResult[]>(
            `/cities/search?name=${encodeURIComponent(name)}`
        );
    },

    remove(id: string) {
        return fetchFromApi<void>(`/cities/${id}`, {
            method: "DELETE",
        });
    },
};
