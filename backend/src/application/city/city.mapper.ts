import { City } from '@/domain/entities/city.entity';
import { CityCoordinatesDto, CityResponseDto } from './city.dto';

export class CityApplicationMapper {
  static toResponse(this: void, city: City): CityResponseDto {
    return {
      id: city.id,
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      createdAt: city.createdAt,
    };
  }

  static toResponses(cities: City[]): CityResponseDto[] {
    return cities.map((city) => this.toResponse(city));
  }

  static toCoordinates(city: {
    name: string;
    latitude: number;
    longitude: number;
  }): CityCoordinatesDto {
    return {
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    };
  }

  static toCoordinatesList(
    cities: {
      name: string;
      latitude: number;
      longitude: number;
    }[],
  ): CityCoordinatesDto[] {
    return cities.map((city) => this.toCoordinates(city));
  }
}
