import { Module } from "@nestjs/common";
import { GruposCompartilhadosController } from "./grupos-compartilhados.controller";
import { GruposCompartilhadosService } from "./grupos-compartilhados.services";
import { PrismaModule } from "../prisma/prisma.module";     

@Module({
  imports: [PrismaModule],
  controllers: [GruposCompartilhadosController],
  providers: [GruposCompartilhadosService],
  exports: [GruposCompartilhadosService],
})
export class GruposCompartilhadosModule {}
