import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MembrosGrupoService } from "./membros-grupo.services";
import { CreateMembrosGrupoDto } from "./dto/create-membros-grupo.dto";
import { UpdateMembrosGrupoDto } from "./dto/update-membros-grupo.dto";

@Controller('membros-grupo')
export class MembrosGrupoController {
  constructor(private readonly membrosGrupoService: MembrosGrupoService) {}

  @Post()
  create(@Body() createMembrosGrupoDto: CreateMembrosGrupoDto) {
    return this.membrosGrupoService.create(createMembrosGrupoDto);
  }

  @Get()
  findAll() {
    return this.membrosGrupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membrosGrupoService.findOne(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembrosGrupoDto: UpdateMembrosGrupoDto) {
    return this.membrosGrupoService.update(id, updateMembrosGrupoDto);
  }

  @Delete(':id')
    remove(@Param('id') id: string) {
    return this.membrosGrupoService.remove(id);
  }
}
