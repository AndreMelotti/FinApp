import { IsString, IsNumber } from "class-validator"

export class CreateWalletMemberDto {
  @IsNumber()
  wallet_id: number

  @IsNumber()
  user_id: number

  @IsString()
  role: string
}
