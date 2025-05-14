import { drizzle } from "drizzle-orm/libsql";
import { env } from "../config/env";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_URL,
  },
});
