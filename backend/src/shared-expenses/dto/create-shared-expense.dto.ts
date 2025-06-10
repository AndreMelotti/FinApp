import { IsString, IsNumber, IsOptional, IsDateString } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateSharedExpenseDto {
  @IsNumber()
  wallet_id: number

  @IsString()
  name: string

  @Type(() => Number)
  total_amount: Decimal

  @IsNumber()
  paid_by: number

  @IsDateString()
  expense_date: string

  @IsOptional()
  @IsString()
  split_type?: string

  @IsOptional()
  @IsString()
  description?: string
}
