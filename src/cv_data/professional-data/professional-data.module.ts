import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { ProfessionalDataController } from './professional-data.controller';


@Module({
  controllers: [ProfessionalDataController],
  imports: [
    ConfigModule.forRoot(),

    ClientsModule.register([
      {
        name: 'CV-SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3003,//parseInt(process.env.CATEGORIEMCPORT),
        }
      },
    ]),


    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3010//parseInt(process.env.AUTHMCPORT),
        }
      },

    ]),


  ],
  providers: [JwtService],


})
export class ProfessionalDataModule {



}
