import { PartialType } from "@nestjs/mapped-types"
import { CreateExpenseGoalDto } from "./create-expense-goal.dto"

export class UpdateExpenseGoalDto extends PartialType(CreateExpenseGoalDto) {}
