import { PartialType } from "@nestjs/swagger";
import { CreateDivisoesDespesasDto } from "./create-divisoes-despesas.dto";

export class UpdateDivisoesDespesasDto extends PartialType(CreateDivisoesDespesasDto) {}
