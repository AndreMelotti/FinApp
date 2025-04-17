import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateDespesasCompartilhadasDto {
    @ApiPropertyOptional({ description: "ID do grupo compartilhado" })
    @IsOptional()
    @IsNumber()
    grupo_id?: number;

    @ApiProperty({ description: "Nome da despesa compartilhada" })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({ description: "Valor da despesa compartilhada" })
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    valor: number;

    @ApiPropertyOptional({ description: "ID do membro que pagou" })
    @IsOptional()
    @IsNumber()
    pago_por?: number;

    @ApiProperty({ description: "Data da despesa" })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    data: Date;

    @ApiProperty({ description: "Tipo de divisão da despesa" })
    @IsNotEmpty()
    @IsString()
    tipo_divisao: string;
}   