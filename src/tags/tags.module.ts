import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TagsController } from './tags.controller';

@Module({
  controllers: [TagsController],
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
        name: 'TAGS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3004,
        }
      },
    ])
  ],
})

export class TagsModule {}
