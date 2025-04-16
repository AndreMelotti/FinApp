import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateReceitaDto } from "./dto/create-receita.dto"
import type { UpdateReceitaDto } from "./dto/update-receita.dto"

@Injectable()
export class ReceitasService {
  constructor(private prisma: PrismaService) {}

  async create(createReceitaDto: CreateReceitaDto) {
    return this.prisma.receita.create({
      data: {
        usuarioId: createReceitaDto.usuarioId,
        categoriaId: createReceitaDto.categoriaId,
        valor: createReceitaDto.valor,
        data: new Date(createReceitaDto.data),
        descricao: createReceitaDto.descricao,
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

    return this.prisma.receita.findMany({
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
    const receita = await this.prisma.receita.findUnique({
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

    if (!receita) {
      throw new NotFoundException(`Receita com ID ${id} não encontrada`)
    }

    return receita
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto) {
    // Verificar se a receita existe
    await this.findOne(id)

    return this.prisma.receita.update({
      where: { id },
      data: {
        usuarioId: updateReceitaDto.usuarioId,
        categoriaId: updateReceitaDto.categoriaId,
        valor: updateReceitaDto.valor,
        data: updateReceitaDto.data ? new Date(updateReceitaDto.data) : undefined,
        descricao: updateReceitaDto.descricao,
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
    // Verificar se a receita existe
    await this.findOne(id)

    await this.prisma.receita.delete({
      where: { id },
    })

    return { message: `Receita com ID ${id} removida com sucesso` }
  }
}
