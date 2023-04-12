import { Module } from '@nestjs/common';
import { AdditionalDataController } from './additional-data.controller';

@Module({
  controllers: [AdditionalDataController]
})
export class AdditionalDataModule {}
