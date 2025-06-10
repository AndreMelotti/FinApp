import { Module } from "@nestjs/common"
import { WalletMembersController } from "./wallet-members.controller"
import { WalletMembersService } from "./wallet-members.service"
import { PrismaModule } from "../prisma/prisma.module"


@Module({
  imports: [PrismaModule],
  controllers: [WalletMembersController],
  providers: [WalletMembersService],
  exports: [WalletMembersService],
})
export class WalletMembersModule {}
