import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateDespesaDto } from "./dto/create-despesa.dto"
import type { UpdateDespesaDto } from "./dto/update-despesa.dto"

@Injectable()
export class DespesasService {
  constructor(private prisma: PrismaService) {}

  async create(createDespesaDto: CreateDespesaDto) {
    return this.prisma.despesa.create({
      data: {
        usuarioId: createDespesaDto.usuarioId,
        categoriaId: createDespesaDto.categoriaId,
        valor: createDespesaDto.valor,
        data: new Date(createDespesaDto.data),
        descricao: createDespesaDto.descricao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        categoria: true,
      },
    })
  }

  async findAll(usuarioId?: number) {
    const where = usuarioId ? { usuarioId } : {}

    return this.prisma.despesa.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        categoria: true,
      },
      orderBy: {
        data: "desc",
      },
    })
  }

  async findOne(id: number) {
    const despesa = await this.prisma.despesa.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        categoria: true,
      },
    })

    if (!despesa) {
      throw new NotFoundException(`Despesa com ID ${id} não encontrada`)
    }

    return despesa
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto) {
    // Verificar se a despesa existe
    await this.findOne(id)

    return this.prisma.despesa.update({
      where: { id },
      data: {
        usuarioId: updateDespesaDto.usuarioId,
        categoriaId: updateDespesaDto.categoriaId,
        valor: updateDespesaDto.valor,
        data: updateDespesaDto.data ? new Date(updateDespesaDto.data) : undefined,
        descricao: updateDespesaDto.descricao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        categoria: true,
      },
    })
  }

  async remove(id: number) {
    // Verificar se a despesa existe
    await this.findOne(id)

    await this.prisma.despesa.delete({
      where: { id },
    })

    return { message: `Despesa com ID ${id} removida com sucesso` }
  }
}
