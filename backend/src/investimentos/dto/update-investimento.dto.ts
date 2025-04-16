import { PartialType } from "@nestjs/swagger"
import { CreateInvestimentoDto } from "./create-investimento.dto"

export class UpdateInvestimentoDto extends PartialType(CreateInvestimentoDto) {}
