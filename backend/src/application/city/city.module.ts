import { Module } from '@nestjs/common';
import { CityController } from '../../api/v1/city.controller';
import { CityService } from './city.service';
import { CityApiService } from '@/infrastructure/open-meteo';
import { WeatherModule } from '../weather/weather.module';
import { CityRepository } from '../../domain/repositories/city.repository';
import { PrismaCityRepository } from './prisma-city.repository';

@Module({
  imports: [WeatherModule],
  controllers: [CityController],
  providers: [{
      provide: CityRepository,
      useClass: PrismaCityRepository,
    }, CityService, CityApiService],
  exports: [CityService,],
})
export class CityModule {}
