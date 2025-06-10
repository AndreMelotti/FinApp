import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateExpenseGoalDto } from "./dto/create-expense-goal.dto"
import type { UpdateExpenseGoalDto } from "./dto/update-expense-goal.dto"

@Injectable()
export class ExpenseGoalsService {
  constructor(private prisma: PrismaService) {}

  create(createExpenseGoalDto: CreateExpenseGoalDto) {
    return this.prisma.expense_goals.create({
      data: createExpenseGoalDto,
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.expense_goals.findMany({
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.expense_goals.findUnique({
      where: { id },
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.expense_goals.findMany({
      where: { wallet_id: walletId },
      include: {
        transaction_categories: true,
        users: true,
      },
    })
  }

  update(id: number, updateExpenseGoalDto: UpdateExpenseGoalDto) {
    return this.prisma.expense_goals.update({
      where: { id },
      data: updateExpenseGoalDto,
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.expense_goals.delete({
      where: { id },
    })
  }
}
