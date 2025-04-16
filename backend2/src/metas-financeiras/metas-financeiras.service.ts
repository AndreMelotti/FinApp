import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateMetaFinanceiraDto } from "./dto/create-meta-financeira.dto"
import { UpdateMetaFinanceiraDto } from "./dto/update-meta-financeira.dto"

@Injectable()
export class MetasFinanceirasService {
  constructor(private prisma: PrismaService) {}

  async create(createMetaFinanceiraDto: CreateMetaFinanceiraDto) {
    return this.prisma.metas_financeiras.create({
      data: createMetaFinanceiraDto,
    })
  }

  async findAll(usuarioId?: number) {
    return this.prisma.metas_financeiras.findMany({
      where: {
        usuario_id: usuarioId,
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.metas_financeiras.findUnique({
      where: { id },
    })
  }

  async update(id: number, updateMetaFinanceiraDto: UpdateMetaFinanceiraDto) {
    return this.prisma.metas_financeiras.update({
      where: { id },
      data: updateMetaFinanceiraDto,
    })
  }

  async remove(id: number) {
    return this.prisma.metas_financeiras.delete({
      where: { id },
    })
  }
} 