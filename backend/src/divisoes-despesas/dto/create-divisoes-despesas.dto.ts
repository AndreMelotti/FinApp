import { IsNotEmpty, IsString } from "class-validator";

export class CreateDivisoesDespesasDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}   