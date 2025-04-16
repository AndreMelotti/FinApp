import { Module } from "@nestjs/common"
import { RelatoriosController } from "./relatorios.controller"
import { RelatoriosService } from "./relatorios.services"

@Module({
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
  exports: [RelatoriosService],
})
export class RelatoriosModule {}