import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateCategoriaDespesaDto {
  @ApiProperty({ description: "Nome da categoria de despesa" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiPropertyOptional({ description: "Descrição da categoria de despesa" })
  @IsOptional()
  @IsString()
  descricao?: string

  @ApiPropertyOptional({ description: "Ícone da categoria de despesa" })
  @IsOptional()
  @IsString()
  icone?: string
}
