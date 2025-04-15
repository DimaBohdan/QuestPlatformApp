import { Prisma } from '@prisma/client';

export const userAnswerWithOptions = Prisma.validator<Prisma.UserAnswerDefaultArgs>()({
  include: {
    selectedOptions: {
      include: {
        option: true,
      },
    },
  },
});

export type UserAnswerWithOptions = Prisma.UserAnswerGetPayload<typeof userAnswerWithOptions>;
