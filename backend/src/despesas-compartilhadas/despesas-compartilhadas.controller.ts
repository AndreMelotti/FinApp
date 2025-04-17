import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DespesasCompartilhadasService } from "./despesas-compartilhadas.services";
import { CreateDespesasCompartilhadasDto } from "./dto/create-despesas-compartilhadas.dto";
import { UpdateDespesasCompartilhadasDto } from "./dto/update-despesas-compartilhadas.dto";

@Controller("despesas-compartilhadas")
export class DespesasCompartilhadasController {
  constructor(private readonly despesasCompartilhadasService: DespesasCompartilhadasService) {}

  @Post()
  create(@Body() createDespesasCompartilhadasDto: CreateDespesasCompartilhadasDto) {
    return this.despesasCompartilhadasService.create(createDespesasCompartilhadasDto);
  }

  @Get()
  findAll() {
    return this.despesasCompartilhadasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.despesasCompartilhadasService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDespesasCompartilhadasDto: UpdateDespesasCompartilhadasDto) {
    return this.despesasCompartilhadasService.update(id, updateDespesasCompartilhadasDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.despesasCompartilhadasService.remove(id);
  }
}
