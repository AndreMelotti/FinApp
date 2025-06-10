import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { InvestmentsService } from "./investments.service"
import type { CreateInvestmentDto } from "./dto/create-investment.dto"
import type { UpdateInvestmentDto } from "./dto/update-investment.dto"

@Controller("investments")
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  create(createInvestmentDto: CreateInvestmentDto) {
    return this.investmentsService.create(createInvestmentDto)
  }

  @Get()
  findAll() {
    return this.investmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.investmentsService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId', ParseIntPipe) walletId: number) {
    return this.investmentsService.findByWallet(walletId);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentsService.update(id, updateInvestmentDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.investmentsService.remove(id);
  }
}
