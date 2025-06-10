import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { UsersModule } from "./users/users.module"
import { WalletsModule } from "./wallets/wallets.module"
import { TransactionsModule } from "./transactions/transactions.module"
import { TransactionCategoriesModule } from "./transaction-categories/transaction-categories.module"
import { DebtsModule } from "./debts/debts.module"
import { FinancialGoalsModule } from "./financial-goals/financial-goals.module"
import { ExpenseGoalsModule } from "./expense-goals/expense-goals.module"
import { InvestmentsModule } from "./investments/investments.module"
import { InvestmentCategoriesModule } from "./investment-categories/investment-categories.module"
import { SharedExpensesModule } from "./shared-expenses/shared-expenses.module"
import { UserSettingsModule } from "./user-settings/user-settings.module"
import { WalletMembersModule } from "./wallet-members/wallet-members.module"

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    WalletsModule,
    TransactionsModule,
    TransactionCategoriesModule,
    DebtsModule,
    FinancialGoalsModule,
    ExpenseGoalsModule,
    InvestmentsModule,
    InvestmentCategoriesModule,
    SharedExpensesModule,
    UserSettingsModule,
    WalletMembersModule,
  ],
})
export class AppModule {}
