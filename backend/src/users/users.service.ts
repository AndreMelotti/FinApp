import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    })
  }

  findAll() {
    return this.prisma.users.findMany({
      include: {
        user_settings: true,
        wallets: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        user_settings: true,
        wallets: true,
        transactions: true,
        debts: true,
        financial_goals: true,
        investments: true,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id },
    })
  }
}
