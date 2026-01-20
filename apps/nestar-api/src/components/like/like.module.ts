import { Module } from '@nestjs/common';
import LikeSchema from '../../schemas/Like.model';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';

@Module({
	imports: [
		// LIKE SCHEMA MODULE
		MongooseModule.forFeature([
			{
				name: 'Like',
				schema: LikeSchema,
			},
		]),
	],
	providers: [LikeService], // RESOLVERNI YOQLIGINI SABABINI BOSHQA MODULLAR UCHUN XIZMAT QILADI
	exports: [LikeService],
})
export class LikeModule {}
