import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateTransactionCategoryDto } from "./dto/create-transaction-category.dto"
import type { UpdateTransactionCategoryDto } from "./dto/update-transaction-category.dto"

@Injectable()
export class TransactionCategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.prisma.transaction_categories.create({
      data: createTransactionCategoryDto,
    })
  }

  findAll() {
    return this.prisma.transaction_categories.findMany({
      include: {
        wallets: true,
        transactions: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.transaction_categories.findUnique({
      where: { id },
      include: {
        wallets: true,
        transactions: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.transaction_categories.findMany({
      where: {
        OR: [{ wallet_id: walletId }, { is_default: true }],
      },
    })
  }

  update(id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.prisma.transaction_categories.update({
      where: { id },
      data: updateTransactionCategoryDto,
    })
  }

  remove(id: number) {
    return this.prisma.transaction_categories.delete({
      where: { id },
    })
  }
}
