import { IsBoolean, IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateDivisoesDespesasDto {
  @ApiProperty({ description: "ID da despesa compartilhada" })
  @IsOptional()
  @IsNumber()
  despesa_id?: number;

  @ApiProperty({ description: "ID do membro do grupo" })
  @IsOptional()
  @IsNumber()
  membro_id?: number;

  @ApiProperty({ description: "Valor da divisão" })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  valor: number;

  @ApiPropertyOptional({ description: "Indica se a divisão foi paga" })
  @IsOptional()
  @IsBoolean()
  pago?: boolean;

  @ApiPropertyOptional({ description: "Data do pagamento" })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  data_pagamento?: Date;
}   