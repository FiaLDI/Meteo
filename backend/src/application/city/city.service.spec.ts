import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { CityService } from './city.service';
import { CityRepository } from '@/domain/repositories/city.repository';
import { CityApiService } from '@/infrastructure/open-meteo';
import { WeatherSyncService } from '../weather/weather-sync.service';

describe('CityService', () => {
  let service: CityService;

  const cityRepository = {
    findById: jest.fn(),
    findByName: jest.fn(),
    create: jest.fn(),
    deleteById: jest.fn(),
  };

  const cityApiService = {
    getCityCoordinates: jest.fn(),
  };

  const weatherSyncService = {
    syncCity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CityRepository,
          useValue: cityRepository,
        },
        {
          provide: CityApiService,
          useValue: cityApiService,
        },
        {
          provide: WeatherSyncService,
          useValue: weatherSyncService,
        },
      ],
    }).compile();

    service = module.get(CityService);

    jest.clearAllMocks();
  });

  it('should create city', async () => {
    cityRepository.findByName.mockResolvedValue(null);

    cityApiService.getCityCoordinates.mockResolvedValue({
      results: [
        {
          name: 'Moscow',
          latitude: 55.75,
          longitude: 37.61,
        },
      ],
    });

    cityRepository.create.mockResolvedValue({
      id: '1',
      name: 'Moscow',
      latitude: 55.75,
      longitude: 37.61,
      createdAt: new Date(),
    });

    await service.create('Moscow');

    expect(cityRepository.create).toHaveBeenCalled();

    expect(weatherSyncService.syncCity).toHaveBeenCalledWith('1');
  });

  it('should throw if city already exists', async () => {
    cityRepository.findByName.mockResolvedValue({
      id: '1',
    });

    await expect(service.create('Moscow')).rejects.toThrow(BadRequestException);
  });

  it('shoukd throw if city not', async () => {
    cityRepository.findByName.mockResolvedValue(null);

    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});
