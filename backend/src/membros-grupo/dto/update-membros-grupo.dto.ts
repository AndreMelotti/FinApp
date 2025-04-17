import { PartialType } from "@nestjs/mapped-types";
import { CreateMembrosGrupoDto } from "./create-membros-grupo.dto";

export class UpdateMembrosGrupoDto extends PartialType(CreateMembrosGrupoDto) {}    
