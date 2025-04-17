import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMembrosGrupoDto } from "./dto/create-membros-grupo.dto";
import { UpdateMembrosGrupoDto } from "./dto/update-membros-grupo.dto";

@Injectable()
export class MembrosGrupoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMembrosGrupoDto) {
    return this.prisma.membrosGrupo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.membrosGrupo.findMany();
  }

  async findOne(id: string) {
    return this.prisma.membrosGrupo.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateMembrosGrupoDto) {
    return this.prisma.membrosGrupo.update({
      where: { id },
      data,
    });
  }
  
  async remove(id: string) {
    return this.prisma.membrosGrupo.delete({
      where: { id },
    });
  }
}
