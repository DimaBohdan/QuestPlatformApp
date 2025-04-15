import { Module } from '@nestjs/common';
import { CoordinateController } from '../controllers/coordinate.controller';
import { CoordinateService } from '../services/coordinate.service';
import { CoordinateRepository } from 'src/database/coordinate.repository';

@Module({
  controllers: [CoordinateController],
  providers: [CoordinateService, CoordinateRepository],
  exports: [CoordinateService, CoordinateRepository]
})
export class CoordinateModule {}
