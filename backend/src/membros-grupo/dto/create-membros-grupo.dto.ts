import { IsNotEmpty, IsString } from "class-validator";

export class CreateMembrosGrupoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}   