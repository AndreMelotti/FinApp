import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { FinancialGoalsService } from "./financial-goals.service"
import type { CreateFinancialGoalDto } from "./dto/create-financial-goal.dto"
import type { UpdateFinancialGoalDto } from "./dto/update-financial-goal.dto"

@Controller("financial-goals")
export class FinancialGoalsController {
  constructor(private readonly financialGoalsService: FinancialGoalsService) {}

  @Post()
  create(createFinancialGoalDto: CreateFinancialGoalDto) {
    return this.financialGoalsService.create(createFinancialGoalDto)
  }

  @Get()
  findAll() {
    return this.financialGoalsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.financialGoalsService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.financialGoalsService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateFinancialGoalDto: UpdateFinancialGoalDto) {
    return this.financialGoalsService.update(id, updateFinancialGoalDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.financialGoalsService.remove(id);
  }
}
