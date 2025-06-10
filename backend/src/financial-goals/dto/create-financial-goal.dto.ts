import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateFinancialGoalDto {
  @IsNumber()
  wallet_id: number

  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @Type(() => Number)
  target_amount: Decimal

  @IsOptional()
  @Type(() => Number)
  current_amount?: Decimal

  @IsDateString()
  target_date: string

  @IsOptional()
  @IsString()
  color?: string

  @IsOptional()
  @IsBoolean()
  is_completed?: boolean

  @IsNumber()
  created_by: number
}
