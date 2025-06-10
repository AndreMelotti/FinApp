import { IsString, IsOptional } from "class-validator"

export class CreateInvestmentCategoryDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string
}
