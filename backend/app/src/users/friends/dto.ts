import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
	@IsNotEmpty()
	@IsNumber()
	user_uid2: number;
}
