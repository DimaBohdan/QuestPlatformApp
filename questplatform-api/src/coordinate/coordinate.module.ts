import { Module } from '@nestjs/common';
import { CoordinateController } from './coordinate.controller';
import { CoordinateService } from './coordinate.service';
import { CoordinateRepository } from 'src/database/coordinate.repository';

@Module({
  controllers: [CoordinateController],
  providers: [CoordinateService, CoordinateRepository],
  exports: [CoordinateService, CoordinateRepository]
})
export class CoordinateModule {}
