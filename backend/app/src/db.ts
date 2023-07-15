import { Client } from 'ts-postgres';

const config = {
	"host": process.env.POSTGRES_DB_HOST,
	"port": process.env.POSTGRES_DB_PORT,
	"user": process.env.POSTGRES_DB_USER,
	"database": process.env.POSTGRES_DB_NAME,
	"password": process.env.POSTGRES_DB_PASS,
}

export const dbClient = new Client(config);

export async function connectDb() {
	await dbClient.connect();
}
