import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schemas/user'
import { env } from '../env'

const postgresDBURL = `postgres://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:5432/${env.PG_DB}`

export const connection = postgres(postgresDBURL, { max: 1 }) 
export const db = drizzle(connection, { schema })