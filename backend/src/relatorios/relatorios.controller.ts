import { Controller, Get, Param } from "@nestjs/common"
import { RelatoriosService } from "./relatorios.services"

@Controller("relatorios")
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get("receitas/:usuarioId")
  async gerarRelatorioReceitas(@Param("usuarioId") usuarioId: number) {
    return this.relatoriosService.gerarRelatorioReceitas(usuarioId)
  }

  @Get("despesas/:usuarioId")
  async gerarRelatorioDespesas(@Param("usuarioId") usuarioId: number) {
    return this.relatoriosService.gerarRelatorioDespesas(usuarioId)
  }

  @Get("investimentos/:usuarioId")
  async gerarRelatorioInvestimentos(@Param("usuarioId") usuarioId: number) {
    return this.relatoriosService.gerarRelatorioInvestimentos(usuarioId)
  }

  @Get("dividas/:usuarioId")
  async gerarRelatorioDividas(@Param("usuarioId") usuarioId: number) {
    return this.relatoriosService.gerarRelatorioDividas(usuarioId)
  }

  @Get("metas-financeiras/:usuarioId")
  async gerarRelatorioMetasFinanceiras(@Param("usuarioId") usuarioId: number) {
    return this.relatoriosService.gerarRelatorioMetasFinanceiras(usuarioId)
  } 
  
}
