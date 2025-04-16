import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateTipoInvestimentoDto } from "./dto/create-tipo-investimento.dto"
import type { UpdateTipoInvestimentoDto } from "./dto/update-tipo-investimento.dto"

@Injectable()
export class TiposInvestimentosService {
  constructor(private prisma: PrismaService) {}

  async create(createTipoInvestimentoDto: CreateTipoInvestimentoDto) {
    return this.prisma.tipoInvestimento.create({
      data: createTipoInvestimentoDto,
    })
  }

  async findAll() {
    return this.prisma.tipoInvestimento.findMany()
  }

  async findOne(id: number) {
    const tipoInvestimento = await this.prisma.tipoInvestimento.findUnique({
      where: { id },
    })

    if (!tipoInvestimento) {
      throw new NotFoundException(`Tipo de investimento com ID ${id} não encontrado`)
    }

    return tipoInvestimento
  }

  async update(id: number, updateTipoInvestimentoDto: UpdateTipoInvestimentoDto) {
    // Verificar se o tipo de investimento existe
    await this.findOne(id)

    return this.prisma.tipoInvestimento.update({
      where: { id },
      data: updateTipoInvestimentoDto,
    })
  }

  async remove(id: number) {
    // Verificar se o tipo de investimento existe
    await this.findOne(id)

    await this.prisma.tipoInvestimento.delete({
      where: { id },
    })

    return { message: `Tipo de investimento com ID ${id} removido com sucesso` }
  }
}
