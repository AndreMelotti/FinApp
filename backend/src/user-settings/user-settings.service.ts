import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateUserSettingDto } from "./dto/create-user-setting.dto"
import type { UpdateUserSettingDto } from "./dto/update-user-setting.dto"

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  create(createUserSettingDto: CreateUserSettingDto) {
    return this.prisma.user_settings.create({
      data: createUserSettingDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findAll() {
    return this.prisma.user_settings.findMany({
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.user_settings.findUnique({
      where: { id },
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  findByUser(userId: number) {
    return this.prisma.user_settings.findUnique({
      where: { user_id: userId },
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  update(id: number, updateUserSettingDto: UpdateUserSettingDto) {
    return this.prisma.user_settings.update({
      where: { id },
      data: updateUserSettingDto,
      include: {
        users: true,
        wallets: true,
      },
    })
  }

  remove(id: number) {
    return this.prisma.user_settings.delete({
      where: { id },
    })
  }
}
