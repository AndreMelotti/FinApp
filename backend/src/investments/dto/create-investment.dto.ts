import { IsString, IsNumber, IsOptional, IsDateString } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateInvestmentDto {
  @IsNumber()
  wallet_id: number

  @IsNumber()
  category_id: number

  @IsString()
  name: string

  @Type(() => Number)
  amount: Decimal

  @IsOptional()
  @Type(() => Number)
  return_rate?: Decimal

  @IsDateString()
  purchase_date: string

  @IsOptional()
  @Type(() => Number)
  quantity?: Decimal

  @IsOptional()
  @Type(() => Number)
  unit_price?: Decimal

  @IsOptional()
  @Type(() => Number)
  current_value?: Decimal

  @IsNumber()
  created_by: number
}
