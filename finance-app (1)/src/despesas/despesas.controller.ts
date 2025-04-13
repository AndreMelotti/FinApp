import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import type { DespesasService } from "./despesas.service"
import type { CreateDespesaDto } from "./dto/create-despesa.dto"
import type { UpdateDespesaDto } from "./dto/update-despesa.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"

@ApiTags("despesas")
@Controller("despesas")
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova despesa' })
  @ApiResponse({ status: 201, description: 'Despesa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createDespesaDto: CreateDespesaDto) {
    return this.despesasService.create(createDespesaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as despesas' })
  @ApiResponse({ status: 200, description: 'Lista de despesas retornada com sucesso.' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number, description: 'Filtrar por ID do usuário' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.despesasService.findAll(usuarioId ? Number.parseInt(usuarioId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma despesa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da despesa' })
  @ApiResponse({ status: 200, description: 'Despesa encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Despesa não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.despesasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma despesa" })
  @ApiParam({ name: "id", description: "ID da despesa" })
  @ApiResponse({ status: 200, description: "Despesa atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Despesa não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDespesaDto: UpdateDespesaDto) {
    return this.despesasService.update(id, updateDespesaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma despesa' })
  @ApiParam({ name: 'id', description: 'ID da despesa' })
  @ApiResponse({ status: 200, description: 'Despesa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Despesa não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.despesasService.remove(id);
  }
}
