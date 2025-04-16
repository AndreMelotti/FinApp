import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateCategoriaReceitaDto } from "./dto/create-categoria-receita.dto"
import type { UpdateCategoriaReceitaDto } from "./dto/update-categoria-receita.dto"

@Injectable()
export class CategoriasReceitasService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaReceitaDto: CreateCategoriaReceitaDto) {
    return this.prisma.categoriaReceita.create({
      data: createCategoriaReceitaDto,
    })
  }

  async findAll() {
    return this.prisma.categoriaReceita.findMany()
  }

  async findOne(id: number) {
    const categoriaReceita = await this.prisma.categoriaReceita.findUnique({
      where: { id },
    })

    if (!categoriaReceita) {
      throw new NotFoundException(`Categoria de receita com ID ${id} não encontrada`)
    }

    return categoriaReceita
  }

  async update(id: number, updateCategoriaReceitaDto: UpdateCategoriaReceitaDto) {
    // Verificar se a categoria existe
    await this.findOne(id)

    return this.prisma.categoriaReceita.update({
      where: { id },
      data: updateCategoriaReceitaDto,
    })
  }

  async remove(id: number) {
    // Verificar se a categoria existe
    await this.findOne(id)

    await this.prisma.categoriaReceita.delete({
      where: { id },
    })

    return { message: `Categoria de receita com ID ${id} removida com sucesso` }
  }
}
