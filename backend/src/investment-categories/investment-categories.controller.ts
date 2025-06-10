import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { InvestmentCategoriesService } from "./investment-categories.service"
import type { CreateInvestmentCategoryDto } from "./dto/create-investment-category.dto"
import type { UpdateInvestmentCategoryDto } from "./dto/update-investment-category.dto"

@Controller("investment-categories")
export class InvestmentCategoriesController {
  constructor(private readonly investmentCategoriesService: InvestmentCategoriesService) {}

  @Post()
  create(createInvestmentCategoryDto: CreateInvestmentCategoryDto) {
    return this.investmentCategoriesService.create(createInvestmentCategoryDto)
  }

  @Get()
  findAll() {
    return this.investmentCategoriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.investmentCategoriesService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateInvestmentCategoryDto: UpdateInvestmentCategoryDto) {
    return this.investmentCategoriesService.update(id, updateInvestmentCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.investmentCategoriesService.remove(id);
  }
}
