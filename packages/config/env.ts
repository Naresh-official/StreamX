import { config } from "dotenv";
import { resolve } from "path";
import z from "zod";

config({ path: resolve(__dirname, "../db/.env") });
config({ path: resolve(__dirname, "../../.env") });

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.string().default("8000"),
	FRONTEND_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
