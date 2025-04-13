import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateInvestimentoDto {
  @ApiProperty({ description: "ID do usuário" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  usuarioId: number

  @ApiPropertyOptional({ description: "ID do tipo de investimento" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tipoId?: number

  @ApiProperty({ description: "Nome do investimento" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiProperty({ description: "Valor do investimento" })
  @IsNotEmpty()
  @IsDecimal()
  valor: string

  @ApiPropertyOptional({ description: "Taxa de retorno do investimento" })
  @IsOptional()
  @IsDecimal()
  taxaRetorno?: string

  @ApiProperty({ description: "Data de início do investimento", example: "2023-01-01" })
  @IsNotEmpty()
  @IsDateString()
  dataInicio: string

  @ApiPropertyOptional({ description: "Data de vencimento do investimento", example: "2025-01-01" })
  @IsOptional()
  @IsDateString()
  dataVencimento?: string

  @ApiPropertyOptional({ description: "Descrição do investimento" })
  @IsOptional()
  @IsString()
  descricao?: string
}
