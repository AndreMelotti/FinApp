import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDivisoesDespesasDto } from "./dto/create-divisoes-despesas.dto";
import { UpdateDivisoesDespesasDto } from "./dto/update-divisoes-despesas.dto";

@Injectable()
export class DivisoesDespesasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDivisoesDespesasDto) {
    return this.prisma.divisao_despesas.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.divisao_despesas.findMany();
  }

  async findOne(id: number) {
    return this.prisma.divisao_despesas.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateDivisoesDespesasDto) {
    return this.prisma.divisao_despesas.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.divisao_despesas.delete({
      where: { id },
    });
  }
}
