export interface CityCoordinatesDto {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CityResponseDto {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface RemoveResponseDto {
  success: boolean
}
