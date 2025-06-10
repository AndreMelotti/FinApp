import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateWalletMemberDto } from "./dto/create-wallet-member.dto"
import type { UpdateWalletMemberDto } from "./dto/update-wallet-member.dto"

@Injectable()
export class WalletMembersService {
  constructor(private prisma: PrismaService) {}

  create(createWalletMemberDto: CreateWalletMemberDto) {
    return this.prisma.wallet_members.create({
      data: createWalletMemberDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.wallet_members.findMany({
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.wallet_members.findUnique({
      where: { id },
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findByWallet(walletId: number) {
    return this.prisma.wallet_members.findMany({
      where: { wallet_id: walletId },
      include: {
        users: true,
      },
    })
  }

  findByUser(userId: number) {
    return this.prisma.wallet_members.findMany({
      where: { user_id: userId },
      include: {
        wallets: true,
      },
    })
  }

  update(id: number, updateWalletMemberDto: UpdateWalletMemberDto) {
    return this.prisma.wallet_members.update({
      where: { id },
      data: updateWalletMemberDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.wallet_members.delete({
      where: { id },
    })
  }
}
