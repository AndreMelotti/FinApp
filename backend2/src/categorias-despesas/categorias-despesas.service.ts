import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateCategoriaDespesaDto } from "./dto/create-categoria-despesa.dto"
import type { UpdateCategoriaDespesaDto } from "./dto/update-categoria-despesa.dto"

@Injectable()
export class CategoriasDespesasService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    return this.prisma.categoriaDespesa.create({
      data: createCategoriaDespesaDto,
    })
  }

  async findAll() {
    return this.prisma.categoriaDespesa.findMany()
  }

  async findOne(id: number) {
    const categoriaDespesa = await this.prisma.categoriaDespesa.findUnique({
      where: { id },
    })

    if (!categoriaDespesa) {
      throw new NotFoundException(`Categoria de despesa com ID ${id} não encontrada`)
    }

    return categoriaDespesa
  }

  async update(id: number, updateCategoriaDespesaDto: UpdateCategoriaDespesaDto) {
    // Verificar se a categoria existe
    await this.findOne(id)

    return this.prisma.categoriaDespesa.update({
      where: { id },
      data: updateCategoriaDespesaDto,
    })
  }

  async remove(id: number) {
    // Verificar se a categoria existe
    await this.findOne(id)

    await this.prisma.categoriaDespesa.delete({
      where: { id },
    })

    return { message: `Categoria de despesa com ID ${id} removida com sucesso` }
  }
}
