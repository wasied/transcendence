import { IsNotEmpty, IsString, IsBoolean, IsDefined, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

/* Chat */

export class CreateDto {
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => sanitizeHtml(value))
	name: string;

	password: string | null;

	@IsNotEmpty()
	@IsBoolean()
	direct_message: boolean;

	@IsDefined()
	@IsNumber()
	other_user_id: number;
}

export class SetHiddenDto {
	@IsNotEmpty()
	@IsBoolean()
	hidden: boolean;

	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;
}

export class UpdateNameDto {
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;
}

export class UpdatePasswordDto {
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsString()
	password: string | null;
}

/* Chat users */

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

export class DeleteDto {
	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;
}

export class SetAdminDto {
	@IsNotEmpty()
	@IsBoolean()
	admin: boolean;

	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;

	@IsNotEmpty()
	@IsNumber()
	user_id: number;
}

/* Punishments */

export class SetPunishmentDto {
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => sanitizeHtml(value))
	type: string;

	@IsNotEmpty()
	@IsNumber()
	chatroom_id: number;

	@IsNotEmpty()
	@IsNumber()
	target_id: number;

	@IsNotEmpty()
	@IsDateString()
	@Transform(({ value }) => sanitizeHtml(value))
	ends_at: string;
}
