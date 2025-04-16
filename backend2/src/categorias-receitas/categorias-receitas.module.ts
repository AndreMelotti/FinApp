import { Module } from "@nestjs/common"
import { CategoriasReceitasService } from "./categorias-receitas.service"
import { CategoriasReceitasController } from "./categorias-receitas.controller"

@Module({
  controllers: [CategoriasReceitasController],
  providers: [CategoriasReceitasService],
  exports: [CategoriasReceitasService],
})
export class CategoriasReceitasModule {}
