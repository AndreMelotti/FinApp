import { Module } from "@nestjs/common"
import { ExpenseGoalsController } from "./expense-goals.controller"
import { ExpenseGoalsService } from "./expense-goals.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseGoalsController],
  providers: [ExpenseGoalsService],
  exports: [ExpenseGoalsService],
})
export class ExpenseGoalsModule {}
