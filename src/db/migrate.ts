import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './config';

await migrate(db, { migrationsFolder: './drizzle/migrations' });
await connection.end();