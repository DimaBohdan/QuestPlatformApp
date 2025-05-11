import { Module } from "@nestjs/common";
import { AiController } from "src/controllers/ai.controller";
import { AiService } from "src/services/ai.service";

@Module({
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService]
})
export class AiModule {}