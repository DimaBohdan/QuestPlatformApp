import { User } from '@prisma/client';
import { Request } from 'express';
import { CaslForbiddenErrorI } from "utils/permissions/casl-rules.factory";

export type RequestExtended = Request & {
    user: User;
    forbiddenError: CaslForbiddenErrorI;
};