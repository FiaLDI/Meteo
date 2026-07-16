import { Test, TestingModule } from '@nestjs/testing';

import { City } from '@/domain/entities/city.entity';
import { CityRepository } from '@/domain/repositories/city.repository';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { WeatherApiService } from '@/infrastructure/open-meteo';

import { WeatherSyncService } from './weather-sync.service';

describe('WeatherSyncService', () => {
  let service: WeatherSyncService;

  const cityRepository = {
    findById: jest.fn(),
    findAllDesc: jest.fn(),
  };

  const weatherRepository = {
    upsertForecast: jest.fn(),
    markAsStale: jest.fn(),
  };

  const weatherApiService = {
    getForecast: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherSyncService,
        {
          provide: CityRepository,
          useValue: cityRepository,
        },
        {
          provide: WeatherRepository,
          useValue: weatherRepository,
        },
        {
          provide: WeatherApiService,
          useValue: weatherApiService,
        },
      ],
    }).compile();

    service = module.get(WeatherSyncService);

    jest.clearAllMocks();
  });

  const city = City.restore({
    id: '1',
    name: 'Moscow',
    latitude: 55,
    longitude: 37,
    createdAt: new Date(),
  });

  it('should return if city not found', async () => {
    cityRepository.findById.mockResolvedValue(null);

    await expect(service.syncCity('1')).resolves.toBeUndefined();

    expect(weatherApiService.getForecast).not.toHaveBeenCalled();
    expect(weatherRepository.upsertForecast).not.toHaveBeenCalled();
    expect(weatherRepository.markAsStale).not.toHaveBeenCalled();
  });

  it('should sync forecast', async () => {
    cityRepository.findById.mockResolvedValue(city);

    weatherApiService.getForecast.mockResolvedValue({
      daily: {
        time: ['2026-07-16'],
        temperature_2m_min: [10],
        temperature_2m_max: [20],
        wind_speed_10m_max: [5],
        weather_code: [1],
      },
    });

    await service.syncCity(city.id);

    expect(weatherApiService.getForecast).toHaveBeenCalledWith(
      city.latitude,
      city.longitude,
      14,
    );

    expect(weatherRepository.upsertForecast).toHaveBeenCalledTimes(1);

    expect(weatherRepository.markAsStale).not.toHaveBeenCalled();
  });

  it('should mark weather as stale when api throws', async () => {
    cityRepository.findById.mockResolvedValue(city);

    weatherApiService.getForecast.mockRejectedValue(
      new Error('API unavailable'),
    );

    await service.syncCity(city.id);

    expect(weatherApiService.getForecast).toHaveBeenCalled();

    expect(weatherRepository.upsertForecast).not.toHaveBeenCalled();

    expect(weatherRepository.markAsStale).toHaveBeenCalledWith(city.id);
  });
});
