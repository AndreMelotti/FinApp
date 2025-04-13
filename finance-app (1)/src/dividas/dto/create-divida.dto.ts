import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateDividaDto {
  @ApiProperty({ description: "ID do usuário" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  usuarioId: number

  @ApiProperty({ description: "Nome da dívida" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiProperty({ description: "Valor total da dívida" })
  @IsNotEmpty()
  @IsDecimal()
  valorTotal: string

  @ApiPropertyOptional({ description: "Valor já pago da dívida" })
  @IsOptional()
  @IsDecimal()
  valorPago?: string

  @ApiPropertyOptional({ description: "Taxa de juros da dívida" })
  @IsOptional()
  @IsDecimal()
  taxaJuros?: string

  @ApiPropertyOptional({ description: "Data de vencimento da dívida", example: "2023-12-31" })
  @IsOptional()
  @IsDateString()
  dataVencimento?: string

  @ApiPropertyOptional({ description: "Número de parcelas" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parcelas?: number

  @ApiPropertyOptional({ description: "Valor da parcela" })
  @IsOptional()
  @IsDecimal()
  valorParcela?: string

  @ApiPropertyOptional({ description: "Descrição da dívida" })
  @IsOptional()
  @IsString()
  descricao?: string
}
