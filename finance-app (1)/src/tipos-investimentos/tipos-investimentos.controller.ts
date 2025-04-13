import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import type { TiposInvestimentosService } from "./tipos-investimentos.service"
import type { CreateTipoInvestimentoDto } from "./dto/create-tipo-investimento.dto"
import type { UpdateTipoInvestimentoDto } from "./dto/update-tipo-investimento.dto"
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"

@ApiTags("tipos-investimentos")
@Controller("tipos-investimentos")
export class TiposInvestimentosController {
  constructor(private readonly tiposInvestimentosService: TiposInvestimentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de investimento' })
  @ApiResponse({ status: 201, description: 'Tipo de investimento criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTipoInvestimentoDto: CreateTipoInvestimentoDto) {
    return this.tiposInvestimentosService.create(createTipoInvestimentoDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os tipos de investimentos" })
  @ApiResponse({ status: 200, description: "Lista de tipos de investimentos retornada com sucesso." })
  findAll() {
    return this.tiposInvestimentosService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um tipo de investimento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do tipo de investimento' })
  @ApiResponse({ status: 200, description: 'Tipo de investimento encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de investimento não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposInvestimentosService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um tipo de investimento" })
  @ApiParam({ name: "id", description: "ID do tipo de investimento" })
  @ApiResponse({ status: 200, description: "Tipo de investimento atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Tipo de investimento não encontrado." })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoInvestimentoDto: UpdateTipoInvestimentoDto) {
    return this.tiposInvestimentosService.update(id, updateTipoInvestimentoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tipo de investimento' })
  @ApiParam({ name: 'id', description: 'ID do tipo de investimento' })
  @ApiResponse({ status: 200, description: 'Tipo de investimento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de investimento não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposInvestimentosService.remove(id);
  }
}
