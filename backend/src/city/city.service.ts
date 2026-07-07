import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.city.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(
    name: string,
    latitude: number,
    longitude: number,
  ) {
    const exists = await this.prisma.city.findUnique({
      where: {
        name,
      },
    });

    if (exists) {
      throw new BadRequestException('City already exists');
    }

    return this.prisma.city.create({
      data: {
        name,
        latitude,
        longitude,
      },
    });
  }

  async remove(id: string) {
    const city = await this.prisma.city.findUnique({
      where: {
        id,
      },
    });

    if (!city) {
      throw new NotFoundException();
    }

    await this.prisma.city.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  }
}
