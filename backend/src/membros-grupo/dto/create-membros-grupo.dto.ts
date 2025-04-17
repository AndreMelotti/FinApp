import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMembrosGrupoDto {
  @ApiPropertyOptional({ description: "ID do grupo compartilhado" })
  @IsOptional()
  @IsNumber()
  grupo_id?: number;

  @ApiPropertyOptional({ description: "ID do usuário" })
  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @ApiProperty({ description: "Nome do membro" })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiPropertyOptional({ description: "Iniciais do membro" })
  @IsOptional()
  @IsString()
  iniciais?: string;

  @ApiPropertyOptional({ description: "URL do avatar do membro" })
  @IsOptional()
  @IsString()
  avatar_url?: string;
}   