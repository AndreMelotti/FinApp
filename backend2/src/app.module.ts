import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { UsuariosModule } from "./usuarios/usuarios.module"
import { CategoriasReceitasModule } from "./categorias-receitas/categorias-receitas.module"
import { CategoriasDespesasModule } from "./categorias-despesas/categorias-despesas.module"
import { ReceitasModule } from "./receitas/receitas.module"
import { DespesasModule } from "./despesas/despesas.module"
import { TiposInvestimentosModule } from "./tipos-investimentos/tipos-investimentos.module"
import { InvestimentosModule } from "./investimentos/investimentos.module"
import { DividasModule } from "./dividas/dividas.module"
import { MetasFinanceirasModule } from "./metas-financeiras/metas-financeiras.module"
import { GruposCompartilhadosModule } from "./grupos-compartilhados/grupos-compartilhados.module"
import { MembrosGrupoModule } from "./membros-grupo/membros-grupo.module"
import { DespesasCompartilhadasModule } from "./despesas-compartilhadas/despesas-compartilhadas.module"
import { DivisoesDespesasModule } from "./divisoes-despesas/divisoes-despesas.module"
import { RelatoriosModule } from "./relatorios/relatorios.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsuariosModule,
    CategoriasReceitasModule,
    CategoriasDespesasModule,
    ReceitasModule,
    DespesasModule,
    TiposInvestimentosModule,
    InvestimentosModule,
    DividasModule,
    MetasFinanceirasModule,
    GruposCompartilhadosModule,
    MembrosGrupoModule,
    DespesasCompartilhadasModule,
    DivisoesDespesasModule,
    RelatoriosModule,
  ],
})
export class AppModule {}
