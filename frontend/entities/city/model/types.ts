export interface CitySearchResult {
    name: string;
    latitude: number;
    longitude: number;
}

export interface City {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface Store {
    cities: City[];
    search: CitySearchResult[];

    load(): Promise<void>;

    searchCities(text: string): Promise<void>;

    clearSearch(): void;

    add(name: string): Promise<void>;

    remove(id: string): Promise<void>;
}
