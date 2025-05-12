import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { getMetadataStorage } from 'class-validator';

export function ApiQueriesFromDto(dto: any): MethodDecorator {
  const meta = getMetadataStorage();
  const fields = meta
    .getTargetValidationMetadatas(dto, '', false, false)
    .map((meta: any) => meta.propertyName)
    .filter((v, i, a) => a.indexOf(v) === i);

  const decorators = fields.map((field: string) =>
    ApiQuery({
      name: field,
      required: false,
      type: Reflect.getMetadata('design:type', dto.prototype, field),
    }),
  );

  return applyDecorators(...decorators);
}
