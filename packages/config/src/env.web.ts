import z from "zod";

const webEnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  BACKEND_URL: z.string().url(),
});

export function getWebEnv() {
  return webEnvSchema.parse(process.env);
}
