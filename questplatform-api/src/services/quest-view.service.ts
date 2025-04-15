// src/quest/quest-view.service.ts

import { Injectable } from '@nestjs/common';
import { QuestViewRepository } from 'src/database/quest-view.repository';

@Injectable()
export class QuestViewService {
  constructor(private readonly repository: QuestViewRepository) {}

  async trackView(userId: string | null, sessionId: string | null, questId: string): Promise<void> {
    try {
      if (userId) {
        await this.repository.upsertByUser(userId, questId);
      } else if (sessionId) {
        await this.repository.upsertBySession(sessionId, questId);
      } else {
        throw new Error('Either userId or sessionId must be provided.');
      }

      await this.repository.incrementQuestViews(questId);
    } catch (error) {
      console.error('Error tracking quest view:', error);
    }
  }
}
