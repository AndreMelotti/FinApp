import { PartialType } from "@nestjs/swagger"
import { CreateMetaFinanceiraDto } from "./create-meta-financeira.dto"

export class UpdateMetaFinanceiraDto extends PartialType(CreateMetaFinanceiraDto) {}
