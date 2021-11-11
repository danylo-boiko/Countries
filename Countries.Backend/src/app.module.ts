import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CountriesModule]
})
export class AppModule {}
