import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateMetaFinanceiraDto {
  @ApiProperty({ description: "ID do usuário" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  usuarioId: number

  @ApiProperty({ description: "Nome da meta financeira" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiPropertyOptional({ description: "Descrição da meta financeira" })
  @IsOptional()
  @IsString()
  descricao?: string

  @ApiProperty({ description: "Valor alvo da meta financeira" })
  @IsNotEmpty()
  @IsDecimal()
  valorAlvo: string

  @ApiPropertyOptional({ description: "Valor atual da meta financeira" })
  @IsOptional()
  @IsDecimal()
  valorAtual?: string

  @ApiPropertyOptional({ description: "Data alvo para atingir a meta", example: "2025-12-31" })
  @IsOptional()
  @IsDateString()
  dataAlvo?: string
}
