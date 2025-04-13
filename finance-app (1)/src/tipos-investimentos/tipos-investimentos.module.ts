import { Module } from "@nestjs/common"
import { TiposInvestimentosService } from "./tipos-investimentos.service"
import { TiposInvestimentosController } from "./tipos-investimentos.controller"

@Module({
  controllers: [TiposInvestimentosController],
  providers: [TiposInvestimentosService],
})
export class TiposInvestimentosModule {}
