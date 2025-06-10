import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { ExpenseGoalsService } from "./expense-goals.service"
import type { CreateExpenseGoalDto } from "./dto/create-expense-goal.dto"
import type { UpdateExpenseGoalDto } from "./dto/update-expense-goal.dto"

@Controller("expense-goals")
export class ExpenseGoalsController {
  constructor(private readonly expenseGoalsService: ExpenseGoalsService) {}

  @Post()
  create(createExpenseGoalDto: CreateExpenseGoalDto) {
    return this.expenseGoalsService.create(createExpenseGoalDto)
  }

  @Get()
  findAll() {
    return this.expenseGoalsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseGoalsService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.expenseGoalsService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateExpenseGoalDto: UpdateExpenseGoalDto) {
    return this.expenseGoalsService.update(id, updateExpenseGoalDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expenseGoalsService.remove(id);
  }
}
