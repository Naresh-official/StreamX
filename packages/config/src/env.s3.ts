import z from "zod";

const s3EnvSchema = z.object({
  AWS_REGION: z.string().default("us-east-1"),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  CLOUDFRONT_DISTRIBUTION: z.string(),
  S3_BUCKET: z.string(),
});

export function getS3Env() {
  return s3EnvSchema.parse(process.env);
}
