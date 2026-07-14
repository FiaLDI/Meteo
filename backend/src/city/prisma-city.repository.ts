import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CityRepository } from './city.repository';

@Injectable()
export class PrismaCityRepository extends CityRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findAll() {
    return this.prisma.city.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findAllDesc() {
    return this.prisma.city.findMany();
  }

  findById(id: string) {
    return this.prisma.city.findUnique({
      where: {
        id,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.city.findUnique({
      where: {
        name,
      },
    });
  }

  create(data: {
    name: string;
    latitude: number;
    longitude: number;
  }) {
    return this.prisma.city.create({
      data,
    });
  }

  async deleteById(id: string) {
    await this.prisma.city.delete({
      where: {
        id,
      },
    });
  }
}