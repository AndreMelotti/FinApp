import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateTransactionDto {
  @IsNumber()
  wallet_id: number

  @IsNumber()
  category_id: number

  @IsString()
  type: string

  @Type(() => Number)
  amount: Decimal

  @IsOptional()
  @IsString()
  description?: string

  @IsDateString()
  transaction_date: string

  @IsOptional()
  @IsBoolean()
  is_recurring?: boolean

  @IsOptional()
  @IsString()
  recurring_frequency?: string

  @IsNumber()
  created_by: number
}
