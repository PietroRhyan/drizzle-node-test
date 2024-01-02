import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schemas/user'

const postgresDBURL = `postgres://${process.env.PG_USER!}:${process.env.PG_PASSWORD!}@${process.env.PG_HOST!}:5432/${process.env.PG_DB!}`

export const connection = postgres(postgresDBURL, { max: 1 }) 
export const db = drizzle(connection, { schema })