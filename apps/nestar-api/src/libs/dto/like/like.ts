import { Field, ObjectType } from '@nestjs/graphql';
import { LikeGroup } from '../../enums/like.enum';
import { ObjectId } from 'mongoose';


// MALUM BIR TARGETGA LAYK BOSILGAN YOKI BOSILMAGANI ANIQLASH UCHUN XIZMAT QILADI
@ObjectType()
export class MeLiked {
	@Field(() => String)
	memberId: ObjectId;

	@Field(() => String)
	likeRefId: ObjectId;

	@Field(() => Boolean)
	myFavorite: boolean;
}

// LAYKLAR HOSIL BO'LGANDA XIZMAT QILADI
@ObjectType()
export class Like {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => LikeGroup)
	likeGroup: LikeGroup;

	@Field(() => String)
	likeRefId: ObjectId;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
