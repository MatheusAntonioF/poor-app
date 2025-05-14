import { createOpenAI } from "@ai-sdk/openai";
import { env } from "../config/env";

export const openaiClient = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});
