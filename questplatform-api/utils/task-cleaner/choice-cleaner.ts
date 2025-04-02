import { Injectable } from "@nestjs/common";
import { OptionService } from "src/option/option.service";

@Injectable()
export class ChoiceCleaner implements TaskCleaner {
  constructor(private optionService: OptionService) {}

  async clear(taskId: string): Promise<void> {
    await this.optionService.clearOptions(taskId);
  }
}
