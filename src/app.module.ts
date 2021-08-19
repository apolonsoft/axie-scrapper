import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiesModule } from './axies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AxiesModule,
  ],
})
export class AppModule {}
