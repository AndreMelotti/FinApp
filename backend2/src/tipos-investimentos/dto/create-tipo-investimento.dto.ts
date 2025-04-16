import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateTipoInvestimentoDto {
  @ApiProperty({ description: "Nome do tipo de investimento" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiPropertyOptional({ description: "Descrição do tipo de investimento" })
  @IsOptional()
  @IsString()
  descricao?: string
}
