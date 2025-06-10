import { IsString, IsNumber, IsOptional } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateExpenseGoalDto {
  @IsNumber()
  wallet_id: number

  @IsNumber()
  category_id: number

  @Type(() => Number)
  percentage: Decimal

  @IsOptional()
  @IsString()
  color?: string

  @IsNumber()
  created_by: number
}
