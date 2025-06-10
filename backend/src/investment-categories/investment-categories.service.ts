import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateInvestmentCategoryDto } from "./dto/create-investment-category.dto"
import type { UpdateInvestmentCategoryDto } from "./dto/update-investment-category.dto"

@Injectable()
export class InvestmentCategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createInvestmentCategoryDto: CreateInvestmentCategoryDto) {
    return this.prisma.investment_categories.create({
      data: createInvestmentCategoryDto,
    })
  }

  findAll() {
    return this.prisma.investment_categories.findMany({
      include: {
        investments: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.investment_categories.findUnique({
      where: { id },
      include: {
        investments: true,
      },
    })
  }

  update(id: number, updateInvestmentCategoryDto: UpdateInvestmentCategoryDto) {
    return this.prisma.investment_categories.update({
      where: { id },
      data: updateInvestmentCategoryDto,
    })
  }

  remove(id: number) {
    return this.prisma.investment_categories.delete({
      where: { id },
    })
  }
}
