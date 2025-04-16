import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateDividaDto } from "./dto/create-divida.dto"
import type { UpdateDividaDto } from "./dto/update-divida.dto"

@Injectable()
export class DividasService {
  constructor(private prisma: PrismaService) { }

  async create(createDividaDto: CreateDividaDto) {
    return this.prisma.dividas.create({
      data: {
        usuarioId: createDividaDto.usuarioId,
        nome: createDividaDto.nome,
        valorTotal: createDividaDto.valorTotal,
        valorPago: createDividaDto.valorPago || "0",
        taxaJuros: createDividaDto.taxaJuros,
        dataVencimento: createDividaDto.dataVencimento ? new Date(createDividaDto.dataVencimento) : null,
        parcelas: createDividaDto.parcelas,
        valorParcela: createDividaDto.valorParcela,
        descricao: createDividaDto.descricao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    })
  }

  async findAll(usuarioId?: number) {
    const where = usuarioId ? { usuarioId } : {}

    return this.prisma.divida.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        dataVencimento: "asc",
      },
    })
  }

  async findOne(id: number) {
    const divida = await this.prisma.divida.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    })

    if (!divida) {
      throw new NotFoundException(`Dívida com ID ${id} não encontrada`)
    }

    return divida
  }

  async update(id: number, updateDividaDto: UpdateDividaDto) {
    // Verificar se a dívida existe
    await this.findOne(id)

    return this.prisma.divida.update({
      where: { id },
      data: {
        usuarioId: updateDividaDto.usuarioId,
        nome: updateDividaDto.nome,
        valorTotal: updateDividaDto.valorTotal,
        valorPago: updateDividaDto.valorPago,
        taxaJuros: updateDividaDto.taxaJuros,
        dataVencimento: updateDividaDto.dataVencimento ? new Date(updateDividaDto.dataVencimento) : undefined,
        parcelas: updateDividaDto.parcelas,
        valorParcela: updateDividaDto.valorParcela,
        descricao: updateDividaDto.descricao,
        dataAtualizacao: new Date(),
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    })
  }

  async remove(id: number) {
    // Verificar se a dívida existe
    await this.findOne(id)

    await this.prisma.divida.delete({
      where: { id },
    })

    return { message: `Dívida com ID ${id} removida com sucesso` }
  }
}
