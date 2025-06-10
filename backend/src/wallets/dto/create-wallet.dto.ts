import { IsString, IsNumber, IsOptional } from "class-validator"
import { Type } from "class-transformer"
import type { Decimal } from "@prisma/client/runtime/library"

export class CreateWalletDto {
  @IsString()
  name: string

  @IsString()
  type: string

  @IsOptional()
  @IsString()
  color?: string

  @IsOptional()
  @Type(() => Number)
  balance?: Decimal

  @IsNumber()
  owner_id: number
}
