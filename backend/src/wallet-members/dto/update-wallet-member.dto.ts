import { PartialType } from "@nestjs/mapped-types"
import { CreateWalletMemberDto } from "./create-wallet-member.dto"

export class UpdateWalletMemberDto extends PartialType(CreateWalletMemberDto) {}
