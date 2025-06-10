import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator"

export class CreateUserSettingDto {
  @IsNumber()
  user_id: number

  @IsOptional()
  @IsNumber()
  default_wallet_id?: number

  @IsOptional()
  @IsString()
  currency?: string

  @IsOptional()
  @IsString()
  language?: string

  @IsOptional()
  @IsString()
  timezone?: string

  @IsOptional()
  @IsBoolean()
  notifications_enabled?: boolean
}
