import { PartialType } from "@nestjs/mapped-types";
import { CreateGruposCompartilhadosDto } from "./create-grupos-compartilhados.dto";

export class UpdateGruposCompartilhadosDto extends PartialType(CreateGruposCompartilhadosDto) {}
