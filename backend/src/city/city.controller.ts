import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(
    private readonly cityService: CityService,
  ) {}

  @Get()
  async findAll() {
    return this.cityService.findAll();
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      latitude: number;
      longitude: number;
    },
  ) {
    return this.cityService.create(
      body.name,
      body.latitude,
      body.longitude,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return this.cityService.remove(id);
  }
}
