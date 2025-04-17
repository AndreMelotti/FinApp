import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { GruposCompartilhadosService } from "./grupos-compartilhados.services";
import { CreateGruposCompartilhadosDto } from "./dto/create-grupos-compartilhados.dto";
import { UpdateGruposCompartilhadosDto } from "./dto/update-grupos-compartilhados.dto";

@Controller('grupos-compartilhados')
export class GruposCompartilhadosController {
  constructor(private readonly gruposCompartilhadosService: GruposCompartilhadosService) {}

  @Post()
  create(@Body() createGruposCompartilhadosDto: CreateGruposCompartilhadosDto) {
    return this.gruposCompartilhadosService.create(createGruposCompartilhadosDto);
  }

  @Get()
  findAll() {
    return this.gruposCompartilhadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gruposCompartilhadosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGruposCompartilhadosDto: UpdateGruposCompartilhadosDto) {
    return this.gruposCompartilhadosService.update(id, updateGruposCompartilhadosDto);
  }
    
  @Delete(':id')
    remove(@Param('id') id: string) {
    return this.gruposCompartilhadosService.remove(id);
  }
}
