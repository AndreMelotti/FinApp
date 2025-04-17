import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DivisoesDespesasService } from "./divisoes-despesas.services";
import { CreateDivisoesDespesasDto } from "./dto/create-divisoes-despesas.dto";
import { UpdateDivisoesDespesasDto } from "./dto/update-divisoes-despesas.dto";

@Controller("divisoes-despesas")
export class DivisoesDespesasController {
  constructor(private readonly divisoesDespesasService: DivisoesDespesasService) {}

  @Post()
  create(@Body() createDivisoesDespesasDto: CreateDivisoesDespesasDto) {
    return this.divisoesDespesasService.create(createDivisoesDespesasDto);
  }

  @Get()
  findAll() {
    return this.divisoesDespesasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.divisoesDespesasService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDivisoesDespesasDto: UpdateDivisoesDespesasDto) {
    return this.divisoesDespesasService.update(id, updateDivisoesDespesasDto);
  }
  
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.divisoesDespesasService.remove(id);
  }
}
            