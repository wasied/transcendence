import { IsNotEmpty, IsString, IsUrl, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class UpdateUsernameDto {
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => sanitizeHtml(value))
	username: string;
}

export class UpdateProfilePictureDto {
	@IsNotEmpty()
	@IsString()
	@IsUrl()
	@Transform(({ value }) => sanitizeHtml(value))
	url: string;
}

export class BlockDto {
	@IsNotEmpty()
	@IsNumber()
	blocker_uid: number;

	@IsNotEmpty()
	@IsNumber()
	blocked_uid: number;
}
