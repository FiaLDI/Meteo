import { City } from '@/domain/entities/city.entity';
import { CityApplicationMapper } from './city.mapper';
import { CityResponseDto } from './city.dto';

describe('CityApplicationMapper', () => {
  let city: City;
  let expected: CityResponseDto;
  let createdAt: Date;

  beforeEach(() => {
    createdAt = new Date();

    city = City.restore({
      id: '1',
      name: 'Moscow',
      latitude: 55,
      longitude: 37,
      createdAt,
    });
    expected = {
      id: '1',
      name: 'Moscow',
      latitude: 55,
      longitude: 37,
      createdAt,
    };
  });

  describe('toResponse', () => {
    it('should map domain city to response dto', () => {
      expect(CityApplicationMapper.toResponse(city)).toStrictEqual(expected);
    });
  });

  describe('toResponses', () => {
    it('should map domain cities to response dto array', () => {
      expect(CityApplicationMapper.toResponses([city, city])).toStrictEqual([
        expected,
        expected,
      ]);
    });
  });
});
