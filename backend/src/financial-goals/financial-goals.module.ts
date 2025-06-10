import { Module } from "@nestjs/common"
import { FinancialGoalsController } from "./financial-goals.controller"
import { FinancialGoalsService } from "./financial-goals.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [FinancialGoalsController],
  providers: [FinancialGoalsService],
  exports: [FinancialGoalsService],
})
export class FinancialGoalsModule {}
