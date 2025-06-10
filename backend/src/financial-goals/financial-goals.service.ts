import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateFinancialGoalDto } from "./dto/create-financial-goal.dto"
import type { UpdateFinancialGoalDto } from "./dto/update-financial-goal.dto"

@Injectable()
export class FinancialGoalsService {
  constructor(private prisma: PrismaService) {}

  create(createFinancialGoalDto: CreateFinancialGoalDto) {
    return this.prisma.financial_goals.create({
      data: createFinancialGoalDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.financial_goals.findMany({
      include: {
        users: true,
        wallets: true,
      },
      orderBy: {
        target_date: "asc",
      },
    })
  }

  findOne(id: number) {
    return this.prisma.financial_goals.findUnique({
      where: { id },
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.financial_goals.findMany({
      where: { wallet_id: walletId },
      include: {
        users: true,
      },
      orderBy: {
        target_date: "asc",
      },
    })
  }

  update(id: number, updateFinancialGoalDto: UpdateFinancialGoalDto) {
    return this.prisma.financial_goals.update({
      where: { id },
      data: updateFinancialGoalDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.financial_goals.delete({
      where: { id },
    })
  }
}
