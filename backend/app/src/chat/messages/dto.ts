import { IsNotEmpty, IsString, IsBoolean, IsDefined, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class SendDto {
	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;

	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => sanitizeHtml(value))
	content: string;
}

export class JoinDto {
	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;
}

export class LeaveDto {
	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;
}
