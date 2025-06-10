import { Module } from "@nestjs/common"
import { TransactionCategoriesController } from "./transaction-categories.controller"
import { TransactionCategoriesService } from "./transaction-categories.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [TransactionCategoriesController],
  providers: [TransactionCategoriesService],
  exports: [TransactionCategoriesService],
})
export class TransactionCategoriesModule {}
