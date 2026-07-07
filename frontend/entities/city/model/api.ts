import { fetchFromApi } from "@/shared/api/client";

export interface City {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export const CityApi = {
    getAll() {
        return fetchFromApi<City[]>("/cities");
    },

    create(data: Omit<City, "id">) {
        return fetchFromApi<City, Omit<City, "id">>("/cities", {
            method: "POST",
            body: data,
        });
    },

    remove(id: string) {
        return fetchFromApi<void>(`/cities/${id}`, {
            method: "DELETE",
        });
    },
};
