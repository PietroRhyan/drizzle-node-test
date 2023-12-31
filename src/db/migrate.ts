import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './config';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle/migrations' });

// Don't forget to close the connection, otherwise the script will hang
await connection.end();