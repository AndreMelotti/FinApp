import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateCategoriaReceitaDto {
  @ApiProperty({ description: "Nome da categoria de receita" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiPropertyOptional({ description: "Descrição da categoria de receita" })
  @IsOptional()
  @IsString()
  descricao?: string

  @ApiPropertyOptional({ description: "Ícone da categoria de receita" })
  @IsOptional()
  @IsString()
  icone?: string
}
