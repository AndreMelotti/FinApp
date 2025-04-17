import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDivisoesDespesasDto } from "./dto/create-divisoes-despesas.dto";
import { UpdateDivisoesDespesasDto } from "./dto/update-divisoes-despesas.dto";

@Injectable()
export class DivisoesDespesasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDivisoesDespesasDto) {
    return this.prisma.divisoesDespesas.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.divisoesDespesas.findMany();
  }

  async findOne(id: string) {
    return this.prisma.divisoesDespesas.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateDivisoesDespesasDto) {
    return this.prisma.divisoesDespesas.update({
      where: { id },
      data,
    });
  }
  
  async remove(id: string) {
    return this.prisma.divisoesDespesas.delete({
      where: { id },
    });
  }
}
