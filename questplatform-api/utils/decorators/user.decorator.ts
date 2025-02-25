import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'utils/types/RequestWithUser';

export const UserRequest = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return data ? request.user?.[data] : request.user;
  },
);
