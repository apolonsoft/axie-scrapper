import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiesModule } from './axies.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/axie_scrapper'),
    AxiesModule,
  ],
})
export class AppModule {}
