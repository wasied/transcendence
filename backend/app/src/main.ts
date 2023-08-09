import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDb } from './db';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const options = {
		origin: process.env.APP_URL,
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true
	};
	app.enableCors(options);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.BACKEND_API_PORT || 3000);
	connectDb();
}
bootstrap();
