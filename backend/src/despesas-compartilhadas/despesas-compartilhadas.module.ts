import { Module } from "@nestjs/common";
import { DespesasCompartilhadasController } from "./despesas-compartilhadas.controller";
import { DespesasCompartilhadasService } from "./despesas-compartilhadas.services";
import { PrismaModule } from "../prisma/prisma.module";
    
@Module({
  controllers: [DespesasCompartilhadasController],
  providers: [DespesasCompartilhadasService],
  exports: [DespesasCompartilhadasService],
  imports: [PrismaModule],
})
export class DespesasCompartilhadasModule {}
