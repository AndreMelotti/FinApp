import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateDebtDto } from "./dto/create-debt.dto"
import type { UpdateDebtDto } from "./dto/update-debt.dto"

@Injectable()
export class DebtsService {
  constructor(private prisma: PrismaService) {}

  create(createDebtDto: CreateDebtDto) {
    return this.prisma.debts.create({
      data: createDebtDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.debts.findMany({
      include: {
        users: true,
        wallets: true,
      },
      orderBy: {
        due_date: "asc",
      },
    })
  }

  findOne(id: number) {
    return this.prisma.debts.findUnique({
      where: { id },
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.debts.findMany({
      where: { wallet_id: walletId },
      include: {
        users: true,
      },
      orderBy: {
        due_date: "asc",
      },
    })
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return this.prisma.debts.update({
      where: { id },
      data: updateDebtDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.debts.delete({
      where: { id },
    })
  }
}
