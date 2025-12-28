import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/** Monorepo module bir nechta serverlarni bitta repositerda saqlanadi **/
/**NestJS ni ingrinendlari => RESOLVER & MODULES & SERVIECES & GUARDS & PIPES & INTERCEPTOR**/
/**Asosiy ingrinend => MODULE lar hisoblanadi**/
/** Bu yerda asosiy module APP MODULE hisoblanadi **/

async function bootstrap() {
	const app = await NestFactory.create(AppModule); // Express + NestJs
	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
