import { Module } from "@nestjs/common"
import { MetasFinanceirasService } from "./metas-financeiras.service"
import { MetasFinanceirasController } from "./metas-financeiras.controller"

@Module({
  controllers: [MetasFinanceirasController],
  providers: [MetasFinanceirasService],
})
export class MetasFinanceirasModule {}
