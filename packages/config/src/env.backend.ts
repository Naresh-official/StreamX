import z from "zod";

const backendEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("8000"),
  FRONTEND_URL: z.string().url(),
  ADMIN_URL: z.string().url(),

  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.string().default("6379"),

  BACKEND_URL: z.string().url(),
});

export function getBackendEnv() {
  return backendEnvSchema.parse(process.env);
}
