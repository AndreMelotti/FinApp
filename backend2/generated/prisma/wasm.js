
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Categorias_despesasScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  descricao: 'descricao',
  icone: 'icone'
};

exports.Prisma.Categorias_receitasScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  descricao: 'descricao',
  icone: 'icone'
};

exports.Prisma.DespesasScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  categoria_id: 'categoria_id',
  valor: 'valor',
  data: 'data',
  descricao: 'descricao',
  data_criacao: 'data_criacao'
};

exports.Prisma.Despesas_compartilhadasScalarFieldEnum = {
  id: 'id',
  grupo_id: 'grupo_id',
  nome: 'nome',
  valor: 'valor',
  pago_por: 'pago_por',
  data: 'data',
  tipo_divisao: 'tipo_divisao',
  data_criacao: 'data_criacao'
};

exports.Prisma.DividasScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  nome: 'nome',
  valor_total: 'valor_total',
  valor_pago: 'valor_pago',
  taxa_juros: 'taxa_juros',
  data_vencimento: 'data_vencimento',
  parcelas: 'parcelas',
  valor_parcela: 'valor_parcela',
  descricao: 'descricao',
  data_criacao: 'data_criacao',
  data_atualizacao: 'data_atualizacao'
};

exports.Prisma.Divisao_despesasScalarFieldEnum = {
  id: 'id',
  despesa_id: 'despesa_id',
  membro_id: 'membro_id',
  valor: 'valor',
  pago: 'pago',
  data_pagamento: 'data_pagamento'
};

exports.Prisma.Grupos_compartilhadosScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  tipo: 'tipo',
  data_criacao: 'data_criacao'
};

exports.Prisma.InvestimentosScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  tipo_id: 'tipo_id',
  nome: 'nome',
  valor: 'valor',
  taxa_retorno: 'taxa_retorno',
  data_inicio: 'data_inicio',
  data_vencimento: 'data_vencimento',
  descricao: 'descricao',
  data_criacao: 'data_criacao',
  data_atualizacao: 'data_atualizacao'
};

exports.Prisma.Membros_grupoScalarFieldEnum = {
  id: 'id',
  grupo_id: 'grupo_id',
  usuario_id: 'usuario_id',
  nome: 'nome',
  iniciais: 'iniciais',
  avatar_url: 'avatar_url',
  data_criacao: 'data_criacao'
};

exports.Prisma.Metas_financeirasScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  nome: 'nome',
  descricao: 'descricao',
  valor_alvo: 'valor_alvo',
  valor_atual: 'valor_atual',
  data_alvo: 'data_alvo',
  data_criacao: 'data_criacao',
  data_atualizacao: 'data_atualizacao'
};

exports.Prisma.ReceitasScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  categoria_id: 'categoria_id',
  valor: 'valor',
  data: 'data',
  descricao: 'descricao',
  data_criacao: 'data_criacao'
};

exports.Prisma.RelatoriosScalarFieldEnum = {
  id: 'id',
  usuario_id: 'usuario_id',
  nome: 'nome',
  tipo: 'tipo',
  periodo: 'periodo',
  data_inicio: 'data_inicio',
  data_fim: 'data_fim',
  data_criacao: 'data_criacao'
};

exports.Prisma.Tipos_investimentosScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  descricao: 'descricao'
};

exports.Prisma.UsuariosScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  email: 'email',
  telefone: 'telefone',
  senha_hash: 'senha_hash',
  data_criacao: 'data_criacao',
  data_atualizacao: 'data_atualizacao'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  categorias_despesas: 'categorias_despesas',
  categorias_receitas: 'categorias_receitas',
  despesas: 'despesas',
  despesas_compartilhadas: 'despesas_compartilhadas',
  dividas: 'dividas',
  divisao_despesas: 'divisao_despesas',
  grupos_compartilhados: 'grupos_compartilhados',
  investimentos: 'investimentos',
  membros_grupo: 'membros_grupo',
  metas_financeiras: 'metas_financeiras',
  receitas: 'receitas',
  relatorios: 'relatorios',
  tipos_investimentos: 'tipos_investimentos',
  usuarios: 'usuarios'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
