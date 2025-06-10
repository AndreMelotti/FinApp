import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator"

export class CreateTransactionCategoryDto {
  @IsString()
  name: string

  @IsString()
  type: string

  @IsOptional()
  @IsNumber()
  wallet_id?: number

  @IsOptional()
  @IsBoolean()
  is_default?: boolean
}
