import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma';
import { CityRepository } from '@/domain/repositories/city.repository';
import { CityMapper } from '../mappers/city.mapper';
import { City } from '@/domain/entities/city.entity';

@Injectable()
export class PrismaCityRepository extends CityRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll() {
    const cities = await this.prisma.city.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return cities.map(CityMapper.toDomain);
  }

  async findAllDesc() {
    const cities = await this.prisma.city.findMany();

    return cities.map(CityMapper.toDomain);
  }

  async findById(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    return city ? CityMapper.toDomain(city) : null;
  }

  async findByName(name: string) {
    const city = await this.prisma.city.findUnique({
      where: { name },
    });

    return city ? CityMapper.toDomain(city) : null;
  }

  async create(city: City): Promise<City> {
    const created = await this.prisma.city.create({
      data: CityMapper.toPersistence(city),
    });

    return CityMapper.toDomain(created);
  }

  async deleteById(id: string) {
    await this.prisma.city.delete({
      where: { id },
    });
  }
}
