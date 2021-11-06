import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryModule } from './modules/country/country.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CountryModule]
})
export class AppModule {}
