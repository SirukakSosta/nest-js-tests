import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { SensorsService } from './sensors.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilterAssetsInterceptor } from 'src/interceptors/filter-assets.interceptor';

@Controller('Sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  async addSensor(
    @Body('title') sensorTitle: string,
    @Body('description') sensorDesc: string,
    @Body('price') sensorPrice: number,
  ) {
    const generatedId = await this.sensorsService.insertSensor(
      sensorTitle,
      sensorDesc,
      sensorPrice,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllSensors() {
    const sensors = await this.sensorsService.getSensors();
    return sensors;
  }

  @UseInterceptors(FilterAssetsInterceptor)
  @Get(':id')
  getSensor(@Param('id') sensorId: string) {
    return this.sensorsService.getSingleSensor(sensorId);
  }

  @Patch(':id')
  async updateSensor(
    @Param('id') sensorId: string,
    @Body('title') sensorTitle: string,
    @Body('description') sensorDesc: string,
    @Body('price') sensorPrice: number,
  ) {
    await this.sensorsService.updateSensor(
      sensorId,
      sensorTitle,
      sensorDesc,
      sensorPrice,
    );
    return null;
  }

  @Delete(':id')
  async removeSensor(@Param('id') sensorId: string) {
    await this.sensorsService.deleteSensor(sensorId);
    return null;
  }
}
