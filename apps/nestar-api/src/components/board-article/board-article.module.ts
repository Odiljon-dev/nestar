import { Module } from '@nestjs/common';
import { BoardArticleResolver } from './board-article.resolver';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'BoardArticle',
				schema: BoardArticleSchema, // Schema nomi 
			},
		]),
		AuthModule, // // AUTH MODUL ga bog'liq narsani ixtiyoriy joyda chaqirib ishlatamiz
		ViewModule, // VIEW MODUL ga bog'liq narsani ixtiyoriy joyda chaqirib ishlatamiz
		MemberModule, // MEMBER MODUL ga bog'liq narsani ixtiyoriy joyda chaqirib ishlatamiz
	],
	providers: [
		BoardArticleResolver, // Controller + Resolver
		BoardArticleService], // BoardArticle Service
	exports: [BoardArticleService], // BoardArticleni service export qilib service.ys chaqirib ishlatamiz
})
export class BoardArticleModule {}
