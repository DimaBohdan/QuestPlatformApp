import { Catch, ExceptionFilter, ArgumentsHost, ForbiddenException } from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';
import { Response } from 'express';
import { AppAbility } from 'utils/permissions/casl-rules.factory';

@Catch(ForbiddenError)
export class CaslForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenError<AppAbility>, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(403).json({
      statusCode: 403,
      message: 'This action is not permitted',
    });
  }
}
