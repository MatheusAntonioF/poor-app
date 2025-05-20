import { z } from 'zod';

const schema = z.object({
    OPENAI_API_KEY: z.string(),
    NODE_ENV: z.union([
        z.literal('test'),
        z.literal('development'),
        z.literal('production'),
    ]),

    DATABASE_URL: z.string(),
});

export const env = schema.parse(process.env);
