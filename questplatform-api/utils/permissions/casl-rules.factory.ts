import { AbilityBuilder, PureAbility } from '@casl/ability';
import { QuestStatus, User } from '@prisma/client';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { SubjectsList } from 'utils/types/subjectsList';
import { ForbiddenError } from '@casl/ability';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type AppAbility = PureAbility<
  [Action, Subjects<SubjectsList> | 'all'],
  PrismaQuery
>;
export type CaslForbiddenErrorI = ForbiddenError<AppAbility>;

export function createForUser(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility,
  );
    can('manage', 'User', { id: user.id });
    can('manage', 'Quest', { authorId: user.id });
    can('read', 'Quest', { quest_status: QuestStatus.PUBLISHED });
    can('read', 'Quest', { authorId: user.id });
    can('manage', 'QuestRun', { createdById: user.id });
    can('manage', 'Option', { task: { quest: { authorId: user.id } } });
    can('manage', 'Coordinate', { findOnTask: { quest: { authorId: user.id } } });
    can('manage', 'QuestReview', { authorId: user.id });
    can('manage', 'QuestTask', { quest: { authorId: user.id } });
    can('read', 'QuestTask', { quest: { authorId: user.id } });
    can('read', 'QuestTask', { quest: { quest_status: QuestStatus.PUBLISHED } });

  return build();
}