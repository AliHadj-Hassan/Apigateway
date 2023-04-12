import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ImagesController } from './images.controller';

@Module({
  imports:[
  
    ConfigModule.forRoot(),
  
    ClientsModule.register([
      {
        name: 'UPLOAD-MC',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3004,//parseInt(process.env.CATEGORIEMCPORT),
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
  
  controllers: [ImagesController]
})
export class ImagesModule {}
