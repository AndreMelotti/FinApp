import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import type { CategoriasReceitasService } from "./categorias-receitas.service"
import type { CreateCategoriaReceitaDto } from "./dto/create-categoria-receita.dto"
import type { UpdateCategoriaReceitaDto } from "./dto/update-categoria-receita.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"

@ApiTags("categorias-receitas")
@Controller("categorias-receitas")
export class CategoriasReceitasController {
  constructor(private readonly categoriasReceitasService: CategoriasReceitasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria de receita' })
  @ApiResponse({ status: 201, description: 'Categoria de receita criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCategoriaReceitaDto: CreateCategoriaReceitaDto) {
    return this.categoriasReceitasService.create(createCategoriaReceitaDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as categorias de receitas" })
  @ApiResponse({ status: 200, description: "Lista de categorias de receitas retornada com sucesso." })
  findAll() {
    return this.categoriasReceitasService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma categoria de receita pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria de receita' })
  @ApiResponse({ status: 200, description: 'Categoria de receita encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria de receita não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasReceitasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma categoria de receita" })
  @ApiParam({ name: "id", description: "ID da categoria de receita" })
  @ApiResponse({ status: 200, description: "Categoria de receita atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Categoria de receita não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaReceitaDto: UpdateCategoriaReceitaDto) {
    return this.categoriasReceitasService.update(id, updateCategoriaReceitaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma categoria de receita' })
  @ApiParam({ name: 'id', description: 'ID da categoria de receita' })
  @ApiResponse({ status: 200, description: 'Categoria de receita removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria de receita não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasReceitasService.remove(id);
  }
}
