import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import type { InvestimentosService } from "./investimentos.service"
import type { CreateInvestimentoDto } from "./dto/create-investimento.dto"
import type { UpdateInvestimentoDto } from "./dto/update-investimento.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"

@ApiTags("investimentos")
@Controller("investimentos")
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo investimento' })
  @ApiResponse({ status: 201, description: 'Investimento criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createInvestimentoDto: CreateInvestimentoDto) {
    return this.investimentosService.create(createInvestimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os investimentos' })
  @ApiResponse({ status: 200, description: 'Lista de investimentos retornada com sucesso.' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number, description: 'Filtrar por ID do usuário' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.investimentosService.findAll(usuarioId ? Number.parseInt(usuarioId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um investimento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do investimento' })
  @ApiResponse({ status: 200, description: 'Investimento encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Investimento não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.investimentosService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um investimento" })
  @ApiParam({ name: "id", description: "ID do investimento" })
  @ApiResponse({ status: 200, description: "Investimento atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Investimento não encontrado." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInvestimentoDto: UpdateInvestimentoDto) {
    return this.investimentosService.update(id, updateInvestimentoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um investimento' })
  @ApiParam({ name: 'id', description: 'ID do investimento' })
  @ApiResponse({ status: 200, description: 'Investimento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Investimento não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.investimentosService.remove(id);
  }
}
