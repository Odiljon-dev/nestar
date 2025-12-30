import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';

/** Monorepo module bir nechta serverlarni bitta repositerda saqlanadi **/
/**NestJS ni ingrinendlari => RESOLVER & MODULES & SERVIECES & GUARDS & PIPES & INTERCEPTOR**/
/**Asosiy ingrinend => MODULE lar hisoblanadi**/
/** Bu yerda asosiy module APP MODULE hisoblanadi **/

async function bootstrap() {
	const app = await NestFactory.create(AppModule); // Express + NestJs
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor());
	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
