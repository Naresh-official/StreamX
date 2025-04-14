import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
