import { PartialType } from "@nestjs/swagger"
import { CreateDividaDto } from "./create-divida.dto"

export class UpdateDividaDto extends PartialType(CreateDividaDto) {}
