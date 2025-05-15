import { generateObject, generateText } from "ai";
import { readFileSync } from "node:fs";
import { z } from "zod";

import { openaiClient } from "@/src/lib/openai-client";
import { env } from "@/src/config/env";

export async function analyzeInvoicePDF(pdfPath: string) {
  if (env.NODE_ENV === "development") return "";

  const invoice = readFileSync(pdfPath);

  const result = await generateText({
    model: openaiClient("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              Preciso que você analise o pdf de uma fatura de cartão de crédito
              e me retorne as seguintes informações que estão contidas nessa fatura

              as informações que preciso:
              - nome do banco
              - data da fatura
              - lista de gastos

              cada gasto deve conter as seguintes informações
              - nome
              - data
              - valor
            `,
          },
          {
            type: "file",
            data: invoice,
            mimeType: "application/pdf",
            // filename: "invoice.pdf", // optional
          },
        ],
      },
    ],
  });

  return result.text;
}

export interface CategorizedExpense {
  invoiceDetails: { bankName: string; invoiceDate: string };
  expenses: { name: string; value: number; date: string; category: string }[];
}

const mockCategorizedData = {
  invoiceDetails: { bankName: "Banco XP S.A.", invoiceDate: "23/01/2025" },
  expenses: [
    {
      name: "EBN *SPOTIFY",
      value: 27.9,
      date: "29/12/2024",
      category: "Outros",
    },
    {
      name: "MERCADOLIVRE*TECHKING",
      value: 81.88,
      date: "01/01/2025",
      category: "Outros",
    },
    {
      name: "SABORES DA POLY",
      value: 21,
      date: "08/01/2025",
      category: "Alimentação",
    },
    {
      name: "SABORES DA POLY",
      value: 15,
      date: "09/01/2025",
      category: "Alimentação",
    },
  ],
};

export async function categorizeExpensesWithAI(
  data: string,
): Promise<CategorizedExpense> {
  if (env.NODE_ENV === "development") return mockCategorizedData;

  const structuredResponse = await generateObject({
    model: openaiClient("gpt-4o-mini"),
    schema: z.object({
      invoiceDetails: z.object({
        bankName: z.string().describe("Nome do banco"),
        invoiceDate: z.string().describe("Data da fatura"),
      }),
      expenses: z
        .object({
          name: z.string().describe("Nome do gasto"),
          value: z.number().describe("valor que foi gasto"),
          date: z.string().describe("data do gasto"),
          category: z.string().describe("Categoria do gasto"),
        })
        .array(),
    }),
    prompt: `
      Tenho aqui os detalhes de uma fatura de cartão de crédito contendo as seguintes informações:
      - nome do banco
      - data da fatura

      gastos:
      - nome do gasto
      - data do gasto
      - valor do gasto

      Preciso que você analise os gastos e categorize cada um deles baseado no nome do gasto
      Segue as categorias disponíveis:
      - Moradia (aluguel, contas de água, luz, internet, etc.)
      - Alimentação (supermercado, restaurantes, delivery)
      - Transporte (combustível, transporte público, manutenção do carro)
      - Saúde (plano de saúde, remédios, consultas)
      - Lazer (cinema, viagens, hobbies, saídas)
      - Educação (cursos, livros, materiais)
      - Outros (roupas, presentes, despesas diversas)

      Esses são todos os gastos que preciso que classifique:
      ${data}
    `,
  });

  return structuredResponse.object;
}
