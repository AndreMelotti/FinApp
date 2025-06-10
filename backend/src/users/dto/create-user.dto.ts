import { IsEmail, IsString, IsOptional, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsString()
  @MinLength(6)
  password_hash: string

  @IsOptional()
  @IsString()
  avatar_url?: string
}
