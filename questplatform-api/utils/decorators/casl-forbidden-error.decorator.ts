import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { createForUser } from 'utils/permissions/casl-rules.factory';

import { ForbiddenError } from '@casl/ability';
import { RequestExtended } from 'utils/types/RequestExtended';

export const CaslForbiddenError = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestExtended>();

    const ability = createForUser(request.user);

    ForbiddenError.from(ability);

    request.forbiddenError = ForbiddenError.from(ability);

    return request.forbiddenError;
  },
);