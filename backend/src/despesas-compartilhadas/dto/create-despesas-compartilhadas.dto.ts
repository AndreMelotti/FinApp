import { IsNotEmpty, IsString } from "class-validator";

export class CreateDespesasCompartilhadasDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}   