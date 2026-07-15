import { Injectable } from "@nestjs/common";
import { CitySearchResponse } from "../../application/city/city.dto";

@Injectable()
export class CityApiService {
    private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
    
    async getCityCoordinates(name: string): Promise<CitySearchResponse> {
        const params = new URLSearchParams({
            name: name.toString(),
            count: "1",
            language: "ru",
            format: "json"
        });
        const url = `${this.baseUrl}?${params}`
    
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather API unavailable');
        }

        return response.json();
    }

    async searchCities(text: string): Promise<CitySearchResponse> {
        const params = new URLSearchParams({
            name: text.toString(),
            count: "10",
            language: "ru",
            format: "json"
        });

        const url =`${this.baseUrl}?${params}`

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather API unavailable');
        }

        return response.json();
    }
}
