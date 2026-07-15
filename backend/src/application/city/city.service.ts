import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CityCoordinatesDto } from './city.dto';
import { CityApiService } from '@/infrastructure/open-meteo';
import { WeatherSyncService } from '../weather/weather-sync.service';
import { CityRepository } from '../../domain/repositories/city.repository';
import { CityServiceContract } from './city.service.contract';


@Injectable()
export class CityService extends CityServiceContract {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly geocodingApi: CityApiService,
    private readonly weatherSync: WeatherSyncService,
  ) {
    super();
  }

  async findAll() {
    return this.cityRepository.findAll();
  }

  async create(name: string) {
    const exists = await this.cityRepository.findByName(name);

    if (exists) {
      throw new BadRequestException('City already exists');
    }

    const city = await this.findCoordinate(name);

    const created = await this.cityRepository.create({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });

    await this.weatherSync.syncCity(created.id);

    return created;
  }

  async remove(id: string) {
    const city = await this.cityRepository.findById(id);

    if (!city) {
      throw new NotFoundException();
    }

    await this.cityRepository.deleteById(id);

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
