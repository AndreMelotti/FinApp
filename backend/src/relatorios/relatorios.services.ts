import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async gerarRelatorioReceitas(usuarioId: number) {
    return this.prisma.receitas.findMany({
      where: { usuario_id: usuarioId },
    })
  }

  async gerarRelatorioDespesas(usuarioId: number) {
    return this.prisma.despesas.findMany({
      where: { usuario_id: usuarioId },
    })
  }

  async gerarRelatorioInvestimentos(usuarioId: number) {
    return this.prisma.investimentos.findMany({
      where: { usuario_id: usuarioId },
    })
  }

  async gerarRelatorioDividas(usuarioId: number) {
    return this.prisma.dividas.findMany({
      where: { usuario_id: usuarioId },
    })
  }

  async gerarRelatorioMetasFinanceiras(usuarioId: number) {
    return this.prisma.metas_financeiras.findMany({
      where: { usuario_id: usuarioId },
    })
  }
}
