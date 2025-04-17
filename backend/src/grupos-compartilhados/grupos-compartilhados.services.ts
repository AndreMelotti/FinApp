import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGruposCompartilhadosDto } from "./dto/create-grupos-compartilhados.dto";
import { UpdateGruposCompartilhadosDto } from "./dto/update-grupos-compartilhados.dto";
@Injectable()
export class GruposCompartilhadosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGruposCompartilhadosDto) {
    return this.prisma.gruposCompartilhados.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.gruposCompartilhados.findMany();
  } 

  async findOne(id: string) {
    return this.prisma.gruposCompartilhados.findUnique({
      where: { id },
    });
  } 

  async update(id: string, data: UpdateGruposCompartilhadosDto) {
    return this.prisma.gruposCompartilhados.update({
      where: { id },
      data,
    });
  } 

  async remove(id: string) {
    return this.prisma.gruposCompartilhados.delete({
      where: { id },
    });
  }
  
  
}      