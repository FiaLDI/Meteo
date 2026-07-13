import { City } from '@prisma/client';

export abstract class CityRepository {
  abstract findAll(): Promise<City[]>;
  abstract findAllDesc(): Promise<City[]>;

  abstract findById(id: string): Promise<City | null>;

  abstract findByName(name: string): Promise<City | null>;

  abstract create(data: {
    name: string;
    latitude: number;
    longitude: number;
  }): Promise<City>;

  abstract deleteById(id: string): Promise<void>;
}
