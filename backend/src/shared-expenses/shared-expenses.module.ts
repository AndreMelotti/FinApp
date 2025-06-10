import { Module } from "@nestjs/common"
import { SharedExpensesController } from "./shared-expenses.controller"
import { SharedExpensesService } from "./shared-expenses.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [SharedExpensesController],
  providers: [SharedExpensesService],
  exports: [SharedExpensesService],
})
export class SharedExpensesModule {}
