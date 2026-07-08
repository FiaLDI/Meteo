import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityApiService } from './city-api.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [CityController],
  providers: [CityService, CityApiService],
  exports: [CityService,],
})
export class CityModule {}
