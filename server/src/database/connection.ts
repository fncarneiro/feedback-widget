import { PrismaClient } from '@prisma/client';

const node_env = process.env.NODE_ENV?.trim();
const url = process.env.DATABASE_URL;

const connection = node_env === 'production'
    ? new PrismaClient({ datasources: { db: { url: url } } })
    : new PrismaClient({ datasources: { db: { url: url } }, log: ["error", "info", "query", "warn"] });

connection.$on('beforeExit', async () => {
    console.log('Shutting down DB Server')
    await connection.$disconnect();
});

export default connection;