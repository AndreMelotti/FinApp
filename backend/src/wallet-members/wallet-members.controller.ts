import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { WalletMembersService } from "./wallet-members.service"
import type { CreateWalletMemberDto } from "./dto/create-wallet-member.dto"
import type { UpdateWalletMemberDto } from "./dto/update-wallet-member.dto"

@Controller("wallet-members")
export class WalletMembersController {
  constructor(private readonly walletMembersService: WalletMembersService) {}

  @Post()
  create(createWalletMemberDto: CreateWalletMemberDto) {
    return this.walletMembersService.create(createWalletMemberDto)
  }

  @Get()
  findAll() {
    return this.walletMembersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.walletMembersService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.walletMembersService.findByWallet(walletId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.walletMembersService.findByUser(userId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateWalletMemberDto: UpdateWalletMemberDto) {
    return this.walletMembersService.update(id, updateWalletMemberDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.walletMembersService.remove(id);
  }
}
