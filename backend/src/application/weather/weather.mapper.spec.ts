import { City } from '@/domain/entities/city.entity';
import { WeatherApplicationMapper } from './weather.mapper';
import { Weather } from '@/domain/entities/weather.entity';
import { Forecast } from '@/domain/entities/weather.forecast.entity';
import { GetWeatherResponseDto } from './weather.dto';

describe('WeatherApplicationMapper', () => {
  let forecast: Forecast;
  let expected: GetWeatherResponseDto;

  beforeEach(() => {
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

    forecast = new Forecast(city, [weather]);

    expected = {
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
    };
  });

  describe('toResponse', () => {
    it('should map forecast to response dto', () => {
      expect(WeatherApplicationMapper.toResponse(forecast)).toStrictEqual(
        expected,
      );
    });
  });
});
