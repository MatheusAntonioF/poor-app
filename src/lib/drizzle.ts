import { drizzle } from "drizzle-orm/libsql";
import { env } from "../config/env";

export const db = drizzle(env.DATABASE_URL);
