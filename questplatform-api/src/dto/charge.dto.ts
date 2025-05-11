import { IsInt, Min } from 'class-validator';

export class ChargeDto {
  @IsInt()
  @Min(1)
  amount: number;
}
