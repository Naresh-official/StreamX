"use client";

import z from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

const _clientEnv = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export const clientEnv = clientEnvSchema.parse(_clientEnv);
