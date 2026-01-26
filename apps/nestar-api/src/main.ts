import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
import { WsAdapter } from '@nestjs/platform-ws';
/** Standard mode => loyihamizda 1 ta server ishlatadigan bo'lsak **/
/** Monorepo module bir nechta serverlarni bitta repositerda saqlanadi **/
/** NestJS ni ingrinendlari => RESOLVER & MODULES & SERVIECES & GUARDS & PIPES & INTERCEPTOR**/
/** Asosiy ingrinend => MODULE lar hisoblanadi**/
/** Bu yerda asosiy module APP MODULE hisoblanadi **/
/** MODULES => eng asoosiy hisoblanadi hammani dependiysiylarni o'ziga ichiga oladi **/

//GLOBAL INTEGRATION
// NESTJS
async function bootstrap() {
	const app = await NestFactory.create(AppModule); //  app => Express + NestJsni qorishmasidan hosil bo'lgan interface
	app.useGlobalPipes(new ValidationPipe()); // Bu DTO (Data Transefer Object) frontendan beckendga to'gi request kelyapkanini tekishiradi xatolik bersa qaytarvoradi
	// 3xil usulda METHOD RESOLVER APPlarga integratsiya qilinadi
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.enableCors({ origin: true, credentials: true }); // Domainlarga ruxsat berish uchun ochiqlaganmiz

	// EXPRESS
	app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 })); // Maximalni faylarimizni o'lchovi hamda  qancha bo'lishini hosil qilganmiz
	app.use('/uploads', express.static('./uploads')); // ./uploads faylimizni tashqi olamga ochiqlaganmiz

	app.useWebSocketAdapter(new WsAdapter(app));

	//  BU EXPRESSNI USTIGA QURGANIMIZ UCHUN BU YERDA HAM ISHLATYABMIZ
	await app.listen(process.env.PORT_API ?? 3000); // PORT_API orqali 3007 portda ishga tushiryapmiz agar mavjud bo'lmasa 3000 portda ishga tushadi
}
bootstrap();
