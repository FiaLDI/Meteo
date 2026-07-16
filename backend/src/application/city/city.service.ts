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
import { City } from '@/domain/entities/city.entity';
import { CityApplicationMapper } from './city.mapper';


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
    const cities = await this.cityRepository.findAll();

    return CityApplicationMapper.toResponses(cities);
  }

  async create(name: string) {
    const exists = await this.cityRepository.findByName(name);

    if (exists) {
      throw new BadRequestException('City already exists');
    }

    const city = await this.findCoordinate(name);

    const cityEntity = City.create({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });

    const created = await this.cityRepository.create(cityEntity);

    await this.weatherSync.syncCity(created.id);

    return CityApplicationMapper.toResponse(created);
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
    
    return CityApplicationMapper.toCoordinates(city);
  }

  async search(text: string): Promise<CityCoordinatesDto[]> {
    const { results } = await this.geocodingApi.searchCities(text);

    const mappedResult =
      CityApplicationMapper.toCoordinatesList(results ?? []);
      
    if (!mappedResult?.length) {
      throw new NotFoundException('City not found');
    }
    
    return mappedResult;
  }
}
