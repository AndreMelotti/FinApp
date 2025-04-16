// src/insights.ts

import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

// === CONFIG ===
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0' });

// === Prompt para gerar resposta personalizada ===
async function gerarInsight(perguntaUsuario: string, dadosUsuario: any[]) {
  const dadosFormatados = dadosUsuario.map((d, i) => {
    return `# Registro ${i + 1}:\n` + Object.entries(d).map(([k, v]) => `- ${k}: ${v}`).join('\n');
  }).join('\n\n');

  const prompt = `
O usuário fez a seguinte pergunta: "${perguntaUsuario}"

Aqui estão os dados financeiros recentes dele:

${dadosFormatados}

Tarefa:
- Gere uma resposta personalizada e útil para o usuário.
- Utilize os dados para fornecer insights financeiros reais.
- Pode incluir: análise de gastos, alertas, sugestões de metas, dicas de investimentos, etc.
- NÃO invente dados. Baseie-se apenas nos dados fornecidos.
- Seja claro, empático e profissional — mas amigável.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// === Consulta dados e responde ===
async function responder(pergunta: string) {
  try {
    // Exemplo: coletar dados da tabela de despesas e receitas do usuário 1
    const { data: despesas, error: erro1 } = await supabase
      .from('despesas')
      .select('*')
      .eq('usuario_id', 1)
      .order('data', { ascending: false })
      .limit(10);

    const { data: receitas, error: erro2 } = await supabase
      .from('receitas')
      .select('*')
      .eq('usuario_id', 1)
      .order('data', { ascending: false })
      .limit(10);

    if (erro1 || erro2 || !despesas || !receitas) {
      throw new Error((erro1?.message || '') + ' ' + (erro2?.message || ''));
    }

    const dadosCombinados = [...receitas, ...despesas];
    return await gerarInsight(pergunta, dadosCombinados);

  } catch (err) {
    const fallbackPrompt = `
Ocorreu um erro ao buscar dados do banco: ${err}.
Responda de forma gentil e peça para o usuário tentar novamente mais tarde.`;
    const result = await model.generateContent(fallbackPrompt);
    const response = await result.response;
    return response.text();
  }
}

// === Execução simples via terminal ===
(async () => {
  const pergunta = process.argv.slice(2).join(' ') || 'Como posso melhorar minhas finanças este mês?';
  const resposta = await responder(pergunta);
  console.log('\n💡 Insight da IA:\n');
  console.log(resposta);
})();
