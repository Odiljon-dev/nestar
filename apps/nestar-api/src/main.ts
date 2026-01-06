import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';

/** Monorepo module bir nechta serverlarni bitta repositerda saqlanadi **/
/**NestJS ni ingrinendlari => RESOLVER & MODULES & SERVIECES & GUARDS & PIPES & INTERCEPTOR**/
/**Asosiy ingrinend => MODULE lar hisoblanadi**/
/** Bu yerda asosiy module APP MODULE hisoblanadi **/

async function bootstrap() {
	const app = await NestFactory.create(AppModule); //  app => Express + NestJsni qorishmasi
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.enableCors({ origin: true, credentials: true });

	app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }));
	app.use('/uploads', express.static('./uploads'));

	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
