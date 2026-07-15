import { CityCoordinatesDto, RemoveResponseDto, ResponseDto } from "./city.dto";

export abstract class CityServiceContract {
  abstract findAll(): Promise<ResponseDto[]>;

  abstract create(name: string): Promise<ResponseDto>; 

  abstract remove(id: string): Promise<RemoveResponseDto>;

  abstract findCoordinate(name: string): Promise<CityCoordinatesDto>;

  abstract search(text: string): Promise<CityCoordinatesDto[]>;
}
