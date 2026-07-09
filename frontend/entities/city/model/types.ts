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
    activeCityId: string | null;
    cities: City[];
    search: CitySearchResult[];    

    load(): Promise<void>;

    searchCities(text: string): Promise<void>;

    clearSearch(): void;

    setActive(id: string): void;

    add(name: string): Promise<void>;

    remove(id: string): Promise<void>;
}


export interface CityCardProps { 
    active: (id: string) => void,
    remove: (id: string) => void, 
    city: City,
    isActive: boolean
}
