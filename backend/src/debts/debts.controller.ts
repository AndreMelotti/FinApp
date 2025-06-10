import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { DebtsService } from "./debts.service"
import type { CreateDebtDto } from "./dto/create-debt.dto"
import type { UpdateDebtDto } from "./dto/update-debt.dto"

@Controller("debts")
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.create(createDebtDto);
  }

  @Get()
  findAll() {
    return this.debtsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.debtsService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.debtsService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.update(id, updateDebtDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.debtsService.remove(id);
  }
}
