import { Module } from '@nestjs/common';
import { HahahaService } from './hahaha.service';
import { HahahaController } from './hahaha.controller';

@Module({
  controllers: [HahahaController],
  providers: [HahahaService]
})
export class HahahaModule {}
