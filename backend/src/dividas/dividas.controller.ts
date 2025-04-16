import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import type { DividasService } from "./dividas.service"
import type { CreateDividaDto } from "./dto/create-divida.dto"
import type { UpdateDividaDto } from "./dto/update-divida.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"

@ApiTags("dividas")
@Controller("dividas")
export class DividasController {
  constructor(private readonly dividasService: DividasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova dívida' })
  @ApiResponse({ status: 201, description: 'Dívida criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createDividaDto: CreateDividaDto) {
    return this.dividasService.create(createDividaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as dívidas' })
  @ApiResponse({ status: 200, description: 'Lista de dívidas retornada com sucesso.' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number, description: 'Filtrar por ID do usuário' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.dividasService.findAll(usuarioId ? Number.parseInt(usuarioId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma dívida pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da dívida' })
  @ApiResponse({ status: 200, description: 'Dívida encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dívida não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dividasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma dívida" })
  @ApiParam({ name: "id", description: "ID da dívida" })
  @ApiResponse({ status: 200, description: "Dívida atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Dívida não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDividaDto: UpdateDividaDto) {
    return this.dividasService.update(id, updateDividaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma dívida' })
  @ApiParam({ name: 'id', description: 'ID da dívida' })
  @ApiResponse({ status: 200, description: 'Dívida removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Dívida não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dividasService.remove(id);
  }
}
