import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PersonalDataController } from './personal-data.controller';

@Module({
  controllers: [PersonalDataController],
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3010
        }
      },

    ]),

    ClientsModule.register([
      {
        name: 'CV-SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3003,
        }
      },
    ])
  ],
})

export class PersonalDataModule { }
