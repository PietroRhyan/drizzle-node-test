import { z } from 'zod'

const envSchema = z.object({
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_HOST: z.string(),
  PG_DB: z.string(),

  SECRET_KEY: z.string(),
})

const envServer = envSchema.safeParse({
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_HOST: process.env.PG_HOST,
  PG_DB: process.env.PG_DB,

  SECRET_KEY: process.env.SECRET_KEY,
})

if (!envServer.success) {
  console.error(envServer.error.issues)

  throw new Error("There is a parse error in your environmental variables")
}

export const env = envServer.data