import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateDebtDto {
  @IsNumber()
  wallet_id: number

  @IsString()
  name: string

  @Type(() => Number)
  total_amount: Decimal

  @Type(() => Number)
  remaining_amount: Decimal

  @Type(() => Number)
  interest_rate: Decimal

  @IsOptional()
  @IsNumber()
  installments?: number

  @IsDateString()
  due_date: string

  @IsOptional()
  @Type(() => Number)
  monthly_payment?: Decimal

  @IsOptional()
  @IsBoolean()
  is_paid_off?: boolean

  @IsNumber()
  created_by: number
}
