import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
    },
  ) {
    return this.cityService.create(
      body.name,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return this.cityService.remove(id);
  }

  @Get('search')
  async search(
    @Query('name') name: string,
  ) {
    return this.cityService.search(name);
  }

  @Get('coordinates')
  async findCoordinate(
    @Query('name') name: string,
  ) {
    return this.cityService.findCoordinate(name);
  }
}
