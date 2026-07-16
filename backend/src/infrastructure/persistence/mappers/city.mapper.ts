import { City as PrismaCity } from '@prisma/client';
import { City } from '@/domain/entities/city.entity';

export class CityMapper {
  static toDomain(city: PrismaCity): City {
    return City.restore(city);
  }

  static toPersistence(city: City) {
    return {
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    };
  }
}