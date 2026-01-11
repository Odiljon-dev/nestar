import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
/** Standard mode => loyihamizda 1 ta server ishlatadigan bo'lsak **/
/** Monorepo module bir nechta serverlarni bitta repositerda saqlanadi **/
/** NestJS ni ingrinendlari => RESOLVER & MODULES & SERVIECES & GUARDS & PIPES & INTERCEPTOR**/
/** Asosiy ingrinend => MODULE lar hisoblanadi**/
/** Bu yerda asosiy module APP MODULE hisoblanadi **/
/** MODULES => eng asoosiy hisoblanadi hammani dependiysiylarni o'ziga ichiga oladi **/

//GLOBAL INTEGRATION
async function bootstrap() {
	const app = await NestFactory.create(AppModule); //  app => Express + NestJsni qorishmasidan hosil bo'lgan interface
	app.useGlobalPipes(new ValidationPipe()); // Bu DTO (Data Transefer Object) frontendan beckendga to'gi request kelyapkanini tekishiradi xatolik bersa qaytarvoradi 
	// 3xil usulda METHOD RESOLVER APPlarga integratsiya qilinadi
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.enableCors({ origin: true, credentials: true });

	app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }));
	app.use('/uploads', express.static('./uploads'));

	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
