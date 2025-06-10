import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateWalletDto } from "./dto/create-wallet.dto"
import type { UpdateWalletDto } from "./dto/update-wallet.dto"

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) { }

  create(createWalletDto: CreateWalletDto) {
    return this.prisma.wallets.create({
      data: createWalletDto,
    })
  }

  findAll() {
    return this.prisma.wallets.findMany({
      include: {
        users: true,
        wallet_members: {
          include: {
            users: true,
          },
        },
      },
    })
  }

  findOne(id: number) {
    return this.prisma.wallets.findUnique({
      where: { id },
      include: {
        users: true,
        wallet_members: {
          include: {
            users: true,
          },
        },
        transactions: true,
        debts: true,
        financial_goals: true,
        investments: true,
      },
    })
  }

  findByUser(userId: number) {
    return this.prisma.wallets.findMany({
      where: {
        OR: [
          { owner_id: userId },
          {
            wallet_members: {
              some: {
                user_id: userId,
              },
            },
          },
        ],
      },
      include: {
        users: true,
        wallet_members: {
          include: {
            users: true,
          },
        },
      },
    })
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return this.prisma.wallets.update({
      where: { id },
      data: updateWalletDto,
    })
  }

  remove(id: number) {
    return this.prisma.wallets.delete({
      where: { id },
    })
  }
}
