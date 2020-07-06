import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  getHello(): any {
    return { connected: mongoose.connection.readyState };
  }
}
