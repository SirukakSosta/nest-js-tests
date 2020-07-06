import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { SensorSchema } from './sensor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
