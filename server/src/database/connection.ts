import { env } from 'process';
import { PrismaClient } from '@prisma/client';

const url = env.DATABASE_URL;

const connection = new PrismaClient({ datasources: { db: { url: url } } });
// { datasources: { db: { url: url } }, log: ["error", "info", "query", "warn"] }

connection.$on('beforeExit', async () => {
    console.log('Shutting down DB Server')
    await connection.$disconnect();
});

export default connection;
