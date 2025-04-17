import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateRelatoriosDto {
  @ApiPropertyOptional({ description: "ID do usuário" })
  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @ApiProperty({ description: "Nome do relatório" })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: "Tipo do relatório" })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({ description: "Período do relatório" })
  @IsNotEmpty()
  @IsString()
  periodo: string;

  @ApiPropertyOptional({ description: "Data de início do relatório" })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  data_inicio?: Date;

  @ApiPropertyOptional({ description: "Data de fim do relatório" })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  data_fim?: Date;
}
