import { PartialType } from "@nestjs/mapped-types";
import { CreateDespesasCompartilhadasDto } from "./create-despesas-compartilhadas.dto";

export class UpdateDespesasCompartilhadasDto extends PartialType(CreateDespesasCompartilhadasDto) {}
