import { IsString } from "class-validator";

export class UpdateDivisoesDespesasDto {
  @IsString()
  nome: string;
}
