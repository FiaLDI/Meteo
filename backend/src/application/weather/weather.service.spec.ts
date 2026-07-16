import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherApiService } from '@/infrastructure/open-meteo';
import { WeatherRepository } from '@/domain/repositories/weather.repository';
import { Forecast } from '@/domain/entities/weather.forecast.entity';
import { City } from '@/domain/entities/city.entity';
import { Weather } from '@/domain/entities/weather.entity';

describe('WeatherService', () => {
  let service: WeatherService;

  const weatherRepository = {
    findByCity: jest.fn(),
  };

  const weatherApiService = {
    getForecast: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
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

    service = module.get(WeatherService);

    jest.clearAllMocks();
  });

  it('should find weather for city', async () => {
    const createdAt = new Date();
    const date = new Date();

    const city = City.restore({
      id: '1',
      name: 'Moscow',
      latitude: 55,
      longitude: 37,
      createdAt,
    });

    const weather = Weather.restore({
      id: '1',
      cityId: '1',
      day: 0,
      date,
      min: 10,
      max: 20,
      wind: 5,
      weatherCode: 1,
      isStale: false,
      createdAt,
    });

    const forecast = new Forecast(city, [weather]);

    weatherRepository.findByCity.mockResolvedValue(forecast);

    await expect(service.getWeather('Moscow')).resolves.toStrictEqual({
      city: 'Moscow',
      forecast: [
        {
          day: 0,
          date,
          min: 10,
          max: 20,
          wind: 5,
          isStale: false,
          weatherCode: 1,
        },
      ],
    });

    expect(weatherRepository.findByCity).toHaveBeenCalledWith('Moscow');
  });

  it('should throw if weather not found', async () => {
    weatherRepository.findByCity.mockResolvedValue(null);

    await expect(service.getWeather('Moscow')).rejects.toThrow(
      NotFoundException,
    );
  });
});
