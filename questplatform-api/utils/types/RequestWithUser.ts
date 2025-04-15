import { Request } from 'express';
import { User } from '@prisma/client';
import { AppAbility } from 'utils/permissions/casl-rules.factory';

export interface RequestWithUser extends Request {
  user: User;
  ability?: AppAbility;
}
