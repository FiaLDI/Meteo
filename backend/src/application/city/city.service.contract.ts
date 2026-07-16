import { CityCoordinatesDto, RemoveResponseDto, CityResponseDto } from "./city.dto";

export abstract class CityServiceContract {
  abstract findAll(): Promise<CityResponseDto[]>;

  abstract create(name: string): Promise<CityResponseDto>; 

  abstract remove(id: string): Promise<RemoveResponseDto>;

  abstract findCoordinate(name: string): Promise<CityCoordinatesDto>;

  abstract search(text: string): Promise<CityCoordinatesDto[]>;
}
