import { User } from '../users/user';
import { Request } from '@nestjs/common';

export type RequestWithUser = Request & { user: User }
