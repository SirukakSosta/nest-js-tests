import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Sensor } from './sensor.model';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel('Sensor') private readonly sensorModel: Model<Sensor>,
  ) {}

  async insertSensor(title: string, desc: string, price: number) {
    const newSensor = new this.sensorModel({
      title,
      description: desc,
      price,
    });
    const result = await newSensor.save();
    return result.id as string;
  }

  async getSensors() {
    const sensors = await this.sensorModel.find().exec();
    return sensors.map(sensor => ({
      id: sensor.id,
      title: sensor.title,
      description: sensor.description,
      price: sensor.price,
    }));
  }

  async getSingleSensor(sensorId: string) {
    const sensor = await this.findSensor(sensorId);
    return {
      id: sensor.id,
      title: sensor.title,
      description: sensor.description,
      price: sensor.price,
    };
  }

  async updateSensor(
    sensorId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedSensor = await this.findSensor(sensorId);
    if (title) {
      updatedSensor.title = title;
    }
    if (desc) {
      updatedSensor.description = desc;
    }
    if (price) {
      updatedSensor.price = price;
    }
    updatedSensor.save();
  }

  async deleteSensor(prodId: string) {
    const result = await this.sensorModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find sensor.');
    }
  }

  private async findSensor(id: string): Promise<Sensor> {
    let sensor;
    try {
      sensor = await this.sensorModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find sensor.');
    }
    if (!sensor) {
      throw new NotFoundException('Could not find sensor.');
    }
    return sensor;
  }
}
