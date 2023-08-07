import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'; 
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class Handle2faDto
{
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsNumberString()
	@Transform(({ value }) => sanitizeHtml(value))
	code: string;
}
