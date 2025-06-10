import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import { TransactionsService } from "./transactions.service"
import type { CreateTransactionDto } from "./dto/create-transaction.dto"
import type { UpdateTransactionDto } from "./dto/update-transaction.dto"

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto)
  }

  @Get()
  // findAll(@Query('walletId', ParseIntPipe) walletId?: number, @Query('type') type?: string) {
  //   return this.transactionsService.findAll(walletId, type)
  // }
  findAll(@Query('walletId') walletId?: string, @Query('type') type?: string) {
    const walletIdNum = walletId ? Number.parseInt(walletId, 10) : undefined
    return this.transactionsService.findAll(walletIdNum, type)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.transactionsService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id);
  }
}
