import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { SharedExpensesService } from "./shared-expenses.service"
import type { CreateSharedExpenseDto } from "./dto/create-shared-expense.dto"
import type { UpdateSharedExpenseDto } from "./dto/update-shared-expense.dto"

@Controller("shared-expenses")
export class SharedExpensesController {
  constructor(private readonly sharedExpensesService: SharedExpensesService) {}

  @Post()
  create(createSharedExpenseDto: CreateSharedExpenseDto) {
    return this.sharedExpensesService.create(createSharedExpenseDto)
  }

  @Get()
  findAll() {
    return this.sharedExpensesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sharedExpensesService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.sharedExpensesService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateSharedExpenseDto: UpdateSharedExpenseDto) {
    return this.sharedExpensesService.update(id, updateSharedExpenseDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sharedExpensesService.remove(id);
  }
}
