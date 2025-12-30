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

/** Bu yerda PROPERTYLAR birlashtirib turadi  **/
@Module({
	imports: [
		ConfigModule.forRoot(), // envni hamma joyda ishlatadi
		GraphQLModule.forRoot({
			// GraphQl orqali o'zimizga kerakli malumotni olishimiz mumkin!
			driver: ApolloDriver, // GraphQl orqali bir vaqtni o'zida bir nechta enpoinyga request jo'natish mumkin!
			playground: true,
			uploads: false,
			autoSchemaFile: true,
			formatError: (error: T) => {
				const graphQLFormattedError = {
					code: error?.extensions.code,
					message:
						error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
				};
				console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
				return graphQLFormattedError;
			},
		}),
		ComponentsModule, // HTTP barcha mantiqlarni bitta joyda saqlaydi!
		DatabaseModule, // TCP connection bolgani uchun!
	],
	controllers: [AppController], //RestApi!
	providers: [AppService, AppResolver], //GraphQl-Api!
})
export class AppModule {}
