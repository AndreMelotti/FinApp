import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateSharedExpenseDto } from "./dto/create-shared-expense.dto"
import type { UpdateSharedExpenseDto } from "./dto/update-shared-expense.dto"

@Injectable()
export class SharedExpensesService {
  constructor(private prisma: PrismaService) {}

  create(createSharedExpenseDto: CreateSharedExpenseDto) {
    return this.prisma.shared_expenses.create({
      data: createSharedExpenseDto,
      include: {
        users: true,
        wallets: true,
        shared_expense_splits: {
          include: {
            users: true,
          },
        },
      },
    })
  }

  findAll() {
    return this.prisma.shared_expenses.findMany({
      include: {
        users: true,
        wallets: true,
        shared_expense_splits: {
          include: {
            users: true,
          },
        },
      },
      orderBy: {
        expense_date: "desc",
      },
    })
  }

  findOne(id: number) {
    return this.prisma.shared_expenses.findUnique({
      where: { id },
      include: {
        users: true,
        wallets: true,
        shared_expense_splits: {
          include: {
            users: true,
          },
        },
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.shared_expenses.findMany({
      where: { wallet_id: walletId },
      include: {
        users: true,
        shared_expense_splits: {
          include: {
            users: true,
          },
        },
      },
      orderBy: {
        expense_date: "desc",
      },
    })
  }

  update(id: number, updateSharedExpenseDto: UpdateSharedExpenseDto) {
    return this.prisma.shared_expenses.update({
      where: { id },
      data: updateSharedExpenseDto,
      include: {
        users: true,
        wallets: true,
        shared_expense_splits: {
          include: {
            users: true,
          },
        },
      },
    })
  }

  remove(id: number) {
    return this.prisma.shared_expenses.delete({
      where: { id },
    })
  }
}
