import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateDespesaDto {
  @ApiProperty({ description: "ID do usuário" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  usuarioId: number

  @ApiPropertyOptional({ description: "ID da categoria de despesa" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoriaId?: number

  @ApiProperty({ description: "Valor da despesa" })
  @IsNotEmpty()
  @IsDecimal()
  valor: string

  @ApiProperty({ description: "Data da despesa", example: "2023-01-01" })
  @IsNotEmpty()
  @IsDateString()
  data: string

  @ApiPropertyOptional({ description: "Descrição da despesa" })
  @IsOptional()
  @IsString()
  descricao?: string
}
