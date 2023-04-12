import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategorieController } from './categorie.controller';

@Module({
  controllers: [CategorieController],
  imports:[
    ConfigModule.forRoot(),

    ClientsModule.register([
      { 
        name: 'CATEGORIE_SERVICE', 
      transport: Transport.TCP,
      options:{ 
        host: "0.0.0.0",
        port:3002// parseInt(process.env.CATEGORIEMCPORT),
      } 
    },
  
    ]),
  ]
})
export class CategorieModule {}
