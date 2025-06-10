import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe, Body } from "@nestjs/common"
import { WalletsService } from "./wallets.service"
import type { CreateWalletDto } from "./dto/create-wallet.dto"
import type { UpdateWalletDto } from "./dto/update-wallet.dto"

@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto)
  }

  @Get()
  findAll() {
    return this.walletsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.walletsService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.walletsService.findByUser(userId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.walletsService.remove(id);
  }
}
