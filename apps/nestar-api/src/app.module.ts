import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './types/common';

// Module markaziy module hisoblanadi
/** Bu yerda PROPERTYLAR birlashtirib turadi  **/
@Module({
	imports: [
		ConfigModule.forRoot(), // envni hamma joyda ishlatadi
		GraphQLModule.forRoot({
			// GRAPHQL API => REST API loyihamizni GRAPHQL API ga o'tkazyabdi!
			// GRAPHQL =>  orqali o'zimizga kerakli malumotni olishimiz mumkin!
			// GRAPHQL => orqali bir vaqtni o'zida bir nechta enpointyga request jo'natish mumkin!
			driver: ApolloDriver,
			playground: true, // Documention avtomatic qurib beradi
			uploads: false, // Bunda biz agar file upload bo'ladigan bo'lsa uni o'chiramiz
			autoSchemaFile: true, // Bu GraphQL schemani avtomatik generatsiya qiladi
			formatError: (error: T) => {
				// Standard errorga o'tkazyabmiz
				const graphQLFormattedError = {
					code: error?.extensions.code,
					message:
						error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
				};
				console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
				return graphQLFormattedError;
			},
		}),
		// COMPONENT HAMDA DATABASE MODULENI ROUTING QILMAGANIMIZNI SABABI BU BIZNING FILE MODULE BO'LGANI UCHUN
		ComponentsModule, // HTTP barcha mantiqlarni bitta joyda saqlaydi!
		DatabaseModule, // TCP connection bolgani uchun!
	],
	controllers: [AppController], //RestApi!
	providers: [AppService, AppResolver], //GraphQl-Api!
})
export class AppModule {}
