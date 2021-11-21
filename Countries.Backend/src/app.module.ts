import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountriesModule } from './modules/countries/countries.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CountriesModule,
        AuthModule,
        UsersModule
    ]
})
export class AppModule {}
