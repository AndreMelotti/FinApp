import { Module } from "@nestjs/common"
import { InvestmentCategoriesController } from "./investment-categories.controller"
import { InvestmentCategoriesService } from "./investment-categories.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [InvestmentCategoriesController],
  providers: [InvestmentCategoriesService],
  exports: [InvestmentCategoriesService],
})
export class InvestmentCategoriesModule {}
