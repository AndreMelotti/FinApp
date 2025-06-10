import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { TransactionCategoriesService } from "./transaction-categories.service"
import type { CreateTransactionCategoryDto } from "./dto/create-transaction-category.dto"
import type { UpdateTransactionCategoryDto } from "./dto/update-transaction-category.dto"

@Controller("transaction-categories")
export class TransactionCategoriesController {
  constructor(private readonly transactionCategoriesService: TransactionCategoriesService) {}

  @Post()
  create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.transactionCategoriesService.create(createTransactionCategoryDto)
  }

  @Get()
  findAll() {
    return this.transactionCategoriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionCategoriesService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.transactionCategoriesService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.transactionCategoriesService.update(id, updateTransactionCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionCategoriesService.remove(id);
  }
}
