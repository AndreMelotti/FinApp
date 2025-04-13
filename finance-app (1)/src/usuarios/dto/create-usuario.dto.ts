import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateUsuarioDto {
  @ApiProperty({ description: "Nome do usuário" })
  @IsNotEmpty()
  @IsString()
  nome: string

  @ApiProperty({ description: "Email do usuário" })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiPropertyOptional({ description: "Telefone do usuário" })
  @IsOptional()
  @IsString()
  telefone?: string

  @ApiProperty({ description: "Senha do usuário" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string
}
