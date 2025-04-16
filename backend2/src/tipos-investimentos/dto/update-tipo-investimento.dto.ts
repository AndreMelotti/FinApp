import { PartialType } from "@nestjs/swagger"
import { CreateTipoInvestimentoDto } from "./create-tipo-investimento.dto"

export class UpdateTipoInvestimentoDto extends PartialType(CreateTipoInvestimentoDto) {}
