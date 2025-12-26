import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule); // Express + NestJs
	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
