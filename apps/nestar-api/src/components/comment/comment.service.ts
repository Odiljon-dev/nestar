import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BoardArticleService } from '../board-article/board-article.service';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { Model, ObjectId } from 'mongoose';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { Comments, Comment } from '../../libs/dto/comment/comment';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { PropertyService } from '../property/property.service';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { T } from '../../types/common';
import { lookupMember } from '../../libs/config';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel('Comment') private readonly commentModel: Model<Comment>,
		private readonly memberService: MemberService,
		private readonly viewService: ViewService,
		private readonly boardArticleService: BoardArticleService,
		private readonly propertyService: PropertyService,
	) {}

	public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
		input.memberId = memberId; // BU YERDA INPUTDAN BIZ MEMBER IDNI KIRITYABMIZ 

		let result = null; // BU YERDA RESULTNI QIYMATINI NULL 

		try {
			result = await this.commentModel.create(input);
		} catch (err) {
			console.log('Error, Service.model:', err.message); // MONGODB ERRONI YUBORADI
			throw new BadGatewayException(Message.CREATE_FAILED);
		}

		switch (input.commentGroup) {  // SWITCH CASELARDAN FOYDAKANYABMIZ
			case CommentGroup.PROPERTY:
				await this.propertyService.propertyStatsEditor({
					_id: input.commentRefId,
					targetKey: 'propertyComments',
					modifier: 1,
				});
				break;
			case CommentGroup.ARTICLE:
				await this.boardArticleService.boardArticleStatsEditor({
					_id: input.commentRefId,
					targetKey: 'articleComments',
					modifier: 1,
				});
				break;
			case CommentGroup.MEMBER:
				await this.memberService.memberStatsEditor({
					_id: input.commentRefId,
					targetKey: 'memberComments',
					modifier: 1,
				});
				break;
		}

		if (!result) throw new InternalServerErrorException(Message.CREATE_FAILED);
		return result;
	}

	public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
		const { _id } = input;
		const result = await this.commentModel.findOneAndUpdate(
			{
				_id: _id, // COMMENTIMIZNI ID 
				memberId: memberId, // MUROJATCHIMIZNI IDSI
				commentStatus: CommentStatus.ACTIVE,
			},
			input,
			{
				new: true,
			},
		);
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
		const { commentRefId } = input.search;
		const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result: Comments[] = await this.commentModel.aggregate([
			{ $match: match },
			{ $sort: sort },
			{
				$facet: {
					list: [
						{
							$skip: (input.page - 1) * input.limit,
						},
						{ $limit: input.limit },
						// meLiked
						lookupMember,
						{ $unwind: '$memberData' },
					],
					metaCounter: [{ $count: 'total' }],
				},
			},
		]);
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
		const result = await this.commentModel.findByIdAndDelete(input);
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

		return result;
	}
}
