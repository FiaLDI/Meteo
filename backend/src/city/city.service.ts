import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CityCoordinatesDto } from './city.dto';
import { CityApiService } from './city-api.service';
import { WeatherSyncService } from '../weather/weather-sync.service';


@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingApi: CityApiService,
    private readonly weatherSync: WeatherSyncService,
  ) {}

  async findAll() {
    return this.prisma.city.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(name: string) {
    const exists = await this.prisma.city.findUnique({
      where: { name },
    });

    if (exists) {
      throw new BadRequestException('City already exists');
    }

    const city = await this.findCoordinate(name);

    const created = await this.prisma.city.create({
      data: {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
      },
    });

    await this.weatherSync.syncCity(created.id);

    return created;
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

  async findCoordinate(name: string): Promise<CityCoordinatesDto> {
    const { results } = await this.geocodingApi.getCityCoordinates(name);

    const city = results?.[0];

    if (!city) {
      throw new NotFoundException('City not found');
    }
    
    return {
      name: city?.name,
      latitude: city?.latitude,
      longitude: city?.longitude
    }
  }

  async search(text: string): Promise<CityCoordinatesDto[]> {
    const { results } = await this.geocodingApi.searchCities(text);

    const mappedResult = results?.map((val) => ({
      name: val.name,
      latitude: val.latitude,
      longitude: val.longitude,
    }));

    if (!mappedResult?.length) {
      throw new NotFoundException('City not found');
    }
    
    return mappedResult;
  }
}
