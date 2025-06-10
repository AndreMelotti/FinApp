import { PartialType } from "@nestjs/mapped-types"
import { CreateSharedExpenseDto } from "./create-shared-expense.dto"

export class UpdateSharedExpenseDto extends PartialType(CreateSharedExpenseDto) {}
