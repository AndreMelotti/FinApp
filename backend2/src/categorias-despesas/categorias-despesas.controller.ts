import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import type { CategoriasDespesasService } from "./categorias-despesas.service"
import type { CreateCategoriaDespesaDto } from "./dto/create-categoria-despesa.dto"
import type { UpdateCategoriaDespesaDto } from "./dto/update-categoria-despesa.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"

@ApiTags("categorias-despesas")
@Controller("categorias-despesas")
export class CategoriasDespesasController {
  constructor(private readonly categoriasDespesasService: CategoriasDespesasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria de despesa' })
  @ApiResponse({ status: 201, description: 'Categoria de despesa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    return this.categoriasDespesasService.create(createCategoriaDespesaDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as categorias de despesas" })
  @ApiResponse({ status: 200, description: "Lista de categorias de despesas retornada com sucesso." })
  findAll() {
    return this.categoriasDespesasService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma categoria de despesa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria de despesa' })
  @ApiResponse({ status: 200, description: 'Categoria de despesa encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria de despesa não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasDespesasService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma categoria de despesa" })
  @ApiParam({ name: "id", description: "ID da categoria de despesa" })
  @ApiResponse({ status: 200, description: "Categoria de despesa atualizada com sucesso." })
  @ApiResponse({ status: 404, description: "Categoria de despesa não encontrada." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDespesaDto: UpdateCategoriaDespesaDto) {
    return this.categoriasDespesasService.update(id, updateCategoriaDespesaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma categoria de despesa' })
  @ApiParam({ name: 'id', description: 'ID da categoria de despesa' })
  @ApiResponse({ status: 200, description: 'Categoria de despesa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria de despesa não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasDespesasService.remove(id);
  }
}
