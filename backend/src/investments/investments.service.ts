import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateInvestmentDto } from "./dto/create-investment.dto"
import type { UpdateInvestmentDto } from "./dto/update-investment.dto"

@Injectable()
export class InvestmentsService {
  constructor(private prisma: PrismaService) {}

  create(createInvestmentDto: CreateInvestmentDto) {
    return this.prisma.investments.create({
      data: createInvestmentDto,
      include: {
        investment_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.investments.findMany({
      include: {
        investment_categories: true,
        users: true,
        wallets: true,
      },
      orderBy: {
        purchase_date: "desc",
      },
    })
  }

  findOne(id: number) {
    return this.prisma.investments.findUnique({
      where: { id },
      include: {
        investment_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.investments.findMany({
      where: { wallet_id: walletId },
      include: {
        investment_categories: true,
        users: true,
      },
      orderBy: {
        purchase_date: "desc",
      },
    })
  }

  update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return this.prisma.investments.update({
      where: { id },
      data: updateInvestmentDto,
      include: {
        investment_categories: true,
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.investments.delete({
      where: { id },
    })
  }
}
