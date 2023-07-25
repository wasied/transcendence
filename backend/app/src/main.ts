import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { connectDb } from './db';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen((process.env.BACKEND_API_PORT || 3000));
	connectDb();
}
bootstrap();
