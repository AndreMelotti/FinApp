import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateInvestimentoDto } from "./dto/create-investimento.dto"
import type { UpdateInvestimentoDto } from "./dto/update-investimento.dto"

@Injectable()
export class InvestimentosService {
  constructor(private prisma: PrismaService) {}

  async create(createInvestimentoDto: CreateInvestimentoDto) {
    return this.prisma.investimento.create({
      data: {
        usuarioId: createInvestimentoDto.usuarioId,
        tipoId: createInvestimentoDto.tipoId,
        nome: createInvestimentoDto.nome,
        valor: createInvestimentoDto.valor,
        taxaRetorno: createInvestimentoDto.taxaRetorno,
        dataInicio: new Date(createInvestimentoDto.dataInicio),
        dataVencimento: createInvestimentoDto.dataVencimento ? new Date(createInvestimentoDto.dataVencimento) : null,
        descricao: createInvestimentoDto.descricao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        tipo: true,
      },
    })
  }

  async findAll(usuarioId?: number) {
    const where = usuarioId ? { usuarioId } : {}

    return this.prisma.investimento.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        tipo: true,
      },
      orderBy: {
        dataInicio: "desc",
      },
    })
  }

  async findOne(id: number) {
    const investimento = await this.prisma.investimento.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        tipo: true,
      },
    })

    if (!investimento) {
      throw new NotFoundException(`Investimento com ID ${id} não encontrado`)
    }

    return investimento
  }

  async update(id: number, updateInvestimentoDto: UpdateInvestimentoDto) {
    // Verificar se o investimento existe
    await this.findOne(id)

    return this.prisma.investimento.update({
      where: { id },
      data: {
        usuarioId: updateInvestimentoDto.usuarioId,
        tipoId: updateInvestimentoDto.tipoId,
        nome: updateInvestimentoDto.nome,
        valor: updateInvestimentoDto.valor,
        taxaRetorno: updateInvestimentoDto.taxaRetorno,
        dataInicio: updateInvestimentoDto.dataInicio ? new Date(updateInvestimentoDto.dataInicio) : undefined,
        dataVencimento: updateInvestimentoDto.dataVencimento
          ? new Date(updateInvestimentoDto.dataVencimento)
          : undefined,
        descricao: updateInvestimentoDto.descricao,
        dataAtualizacao: new Date(),
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        tipo: true,
      },
    })
  }

  async remove(id: number) {
    // Verificar se o investimento existe
    await this.findOne(id)

    await this.prisma.investimento.delete({
      where: { id },
    })

    return { message: `Investimento com ID ${id} removido com sucesso` }
  }
}
