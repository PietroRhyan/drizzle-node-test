import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/db/schemas/*.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    host: env.PG_HOST,
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DB,
  },
} satisfies Config