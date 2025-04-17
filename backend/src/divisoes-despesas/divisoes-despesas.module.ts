import { Module } from "@nestjs/common";
import { DivisoesDespesasController } from "./divisoes-despesas.controller";
import { DivisoesDespesasService } from "./divisoes-despesas.services";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [DivisoesDespesasController],
  providers: [DivisoesDespesasService],
  exports: [DivisoesDespesasService],
  imports: [PrismaModule],
})
export class DivisoesDespesasModule {}
