import { Injectable } from "@nestjs/common";

@Injectable()
export class DefaultCleaner implements TaskCleaner {
  async clear(taskId: string): Promise<void> {
    return;
  }
}