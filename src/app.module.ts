import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsModule } from './sensor/sensors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssetsFilterMiddleware } from './middlewares/assets-filter.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27100/examples'),
    SensorsModule,
    AuthModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AssetsFilterMiddleware).forRoutes('sensors');
  }
}
