import { Module } from "@nestjs/common";
import { MembrosGrupoController } from "./membros-grupo.controller";
import { MembrosGrupoService } from "./membros-grupo.services";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],  
  controllers: [MembrosGrupoController],
  providers: [MembrosGrupoService],
  exports: [MembrosGrupoService],
})
export class MembrosGrupoModule {}
