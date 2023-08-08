import { IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateDto {
	@IsNotEmpty()
	@IsBoolean()
	customization: boolean;

	@IsNotEmpty()
	@IsBoolean()
	automatching: boolean;
}
