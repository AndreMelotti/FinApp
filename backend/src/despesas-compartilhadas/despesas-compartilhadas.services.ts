import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDespesasCompartilhadasDto } from "./dto/create-despesas-compartilhadas.dto";
import { UpdateDespesasCompartilhadasDto } from "./dto/update-despesas-compartilhadas.dto";

@Injectable()
export class DespesasCompartilhadasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDespesasCompartilhadasDto) {
    return this.prisma.despesasCompartilhadas.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.despesasCompartilhadas.findMany();
  }

  async findOne(id: string) {
    return this.prisma.despesasCompartilhadas.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateDespesasCompartilhadasDto) {
    return this.prisma.despesasCompartilhadas.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.despesasCompartilhadas.delete({
      where: { id },
    });
  }
}
