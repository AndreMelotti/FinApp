import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateTransactionDto } from "./dto/create-transaction.dto"
import type { UpdateTransactionDto } from "./dto/update-transaction.dto"

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data: createTransactionDto,
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findAll(walletId?: number, type?: string) {
    const where: any = {}
    if (walletId) where.wallet_id = walletId
    if (type) where.type = type

    return this.prisma.transactions.findMany({
      where,
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
      orderBy: {
        transaction_date: "desc",
      },
    })
  }

  findOne(id: number) {
    return this.prisma.transactions.findUnique({
      where: { id },
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.transactions.findMany({
      where: { wallet_id: walletId },
      include: {
        transaction_categories: true,
        users: true,
      },
      orderBy: {
        transaction_date: "desc",
      },
    })
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      where: { id },
      data: updateTransactionDto,
      include: {
        transaction_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.transactions.delete({
      where: { id },
    })
  }
}
