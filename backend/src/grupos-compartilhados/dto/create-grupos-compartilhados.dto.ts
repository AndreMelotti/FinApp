import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateGruposCompartilhadosDto {
  @ApiProperty({ description: "Nome do grupo compartilhado" })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: "Tipo do grupo compartilhado" })
  @IsNotEmpty()
  @IsString()
  tipo: string;
}