import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common"
import type { ReceitasService } from "./receitas.service"
import type { CreateReceitaDto } from "./dto/create-receita.dto"
import type { UpdateReceitaDto } from "./dto/update-receita.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"

@ApiTags("receitas")
@Controller("receitas")
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova receita' })
  @ApiResponse({ status: 201, description: 'Receita criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createReceitaDto: CreateReceitaDto) {
    return this.receitasService.create(createReceitaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as receitas' })
  @ApiResponse({ status: 200, description: 'Lista de receitas retornada com sucesso.' })
  @ApiQuery({ name: 'usuarioId', required: false, type: Number, description: 'Filtrar por ID do usuário' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.receitasService.findAll(usuarioId ? Number.parseInt(usuarioId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma receita pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da receita' })
  @ApiResponse({ status: 200, description: 'Receita encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Receita não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receitasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma receita" })
  @ApiParam({ name: "id", description: "ID da receita" })
  @ApiResponse({ status: 200, description: "Receita atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Receita não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitasService.update(id, updateReceitaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma receita' })
  @ApiParam({ name: 'id', description: 'ID da receita' })
  @ApiResponse({ status: 200, description: 'Receita removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Receita não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receitasService.remove(id);
  }
}
