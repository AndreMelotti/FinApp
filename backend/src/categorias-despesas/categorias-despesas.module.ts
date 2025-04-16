import { Module } from "@nestjs/common"
import { CategoriasDespesasService } from "./categorias-despesas.service"
import { CategoriasDespesasController } from "./categorias-despesas.controller"

@Module({
  controllers: [CategoriasDespesasController],
  providers: [CategoriasDespesasService],
  exports: [CategoriasDespesasService],
})
export class CategoriasDespesasModule {}
