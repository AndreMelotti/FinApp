import { IsNotEmpty, IsString } from "class-validator";

export class CreateGruposCompartilhadosDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}