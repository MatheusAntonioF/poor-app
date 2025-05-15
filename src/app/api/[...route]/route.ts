import { z } from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { readFileSync } from "node:fs";
import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { writeFile, readFile, unlink } from "node:fs/promises";

import {
  analyzeInvoicePDF,
  categorizeExpensesWithAI,
} from "@/src/server/ai/invoices.ai";
import { openaiClient } from "@/src/lib/openai-client";
import { ExpensesService } from "@/src/server/services/expenses.service";
import { ExpensesMapper } from "@/src/server/mappers/expenses.mapper";

export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.post("/hello", async (c) => {
  const body = await c.req.parseBody();

  const file = body["invoice"] as File;

  const destinationPath = process.cwd() + "/src/tmp/invoice.pdf";

  await saveFileLocally(file, destinationPath);

  const rawResult = await analyzeInvoicePDF(destinationPath);

  await removeFileLocally(destinationPath);

  const data = await categorizeExpensesWithAI(rawResult);

  const expenseService = new ExpensesService();

  const parsedData = ExpensesMapper.batchCategorizedToDomain(data);

  await expenseService.batchCreate(parsedData);

  return c.json({
    message: "Hello from Hono!",
  });
});

async function saveFileLocally(file: File, destinationPath: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer: any = Buffer.from(arrayBuffer);

  await writeFile(destinationPath, buffer);
}

async function removeFileLocally(path: string) {
  await unlink(path);
}

export const POST = handle(app);
