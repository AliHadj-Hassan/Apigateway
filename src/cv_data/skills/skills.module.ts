import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SkillsController } from './skills.controller';


@Module({
  controllers: [SkillsController],
  imports: [
    ConfigModule.forRoot(),
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
export class SkillsModule {}
