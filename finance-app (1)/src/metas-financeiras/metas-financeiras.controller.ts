import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import type { MetasFinanceirasService } from "./metas-financeiras.service"
import type { CreateMetaFinanceiraDto } from "./dto/create-meta-financeira.dto"
import type { UpdateMetaFinanceiraDto } from "./dto/update-meta-financeira.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"

@ApiTags("metas-financeiras")
@Controller("metas-financeiras")
export class MetasFinanceirasController {
  constructor(private readonly metasFinanceirasService: MetasFinanceirasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova meta financeira' })
  @ApiResponse({ status: 201, description: 'Meta financeira criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createMetaFinanceiraDto: CreateMetaFinanceiraDto) {
    return this.metasFinanceirasService.create(createMetaFinanceiraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as metas financeiras' })
  @ApiResponse({ status: 200, description: 'Lista de metas financeiras retornada com sucesso.' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number, description: 'Filtrar por ID do usuário' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.metasFinanceirasService.findAll(usuarioId ? Number.parseInt(usuarioId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma meta financeira pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da meta financeira' })
  @ApiResponse({ status: 200, description: 'Meta financeira encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta financeira não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metasFinanceirasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma meta financeira" })
  @ApiParam({ name: "id", description: "ID da meta financeira" })
  @ApiResponse({ status: 200, description: "Meta financeira atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Meta financeira não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMetaFinanceiraDto: UpdateMetaFinanceiraDto) {
    return this.metasFinanceirasService.update(id, updateMetaFinanceiraDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma meta financeira' })
  @ApiParam({ name: 'id', description: 'ID da meta financeira' })
  @ApiResponse({ status: 200, description: 'Meta financeira removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Meta financeira não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metasFinanceirasService.remove(id);
  }
}
