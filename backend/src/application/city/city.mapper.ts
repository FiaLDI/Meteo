import { City } from '@/domain/entities/city.entity';
import {
  CityCoordinatesDto,
  CityResponseDto,
} from './city.dto';

export class CityApplicationMapper {
  static toResponse(city: City): CityResponseDto {
    return {
      id: city.id,
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      createdAt: city.createdAt,
    };
  }

  static toResponses(cities: City[]): CityResponseDto[] {
    return cities.map(this.toResponse);
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
    return cities.map(this.toCoordinates);
  }
}
