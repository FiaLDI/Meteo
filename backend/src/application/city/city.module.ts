import { Module } from '@nestjs/common';
import { CityController } from '../../api/v1/city.controller';
import { CityService } from './city.service';
import { CityApiService } from '@/infrastructure/open-meteo';
import { CityRepository } from '@/domain/repositories/city.repository';
import { PrismaCityRepository } from '@/infrastructure/persistence/prisma/prisma-city.repository';
import { WeatherModule } from '../weather/weather.module';
import { CityServiceContract } from './city.service.contract';

@Module({
  imports: [WeatherModule],
  controllers: [CityController],
  providers: [
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: CityServiceContract,
      useClass: CityService,
    },
    CityApiService,
  ],
  exports: [CityServiceContract],
})
export class CityModule {}
