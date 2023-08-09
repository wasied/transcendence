import { User } from '../users/user';
import { Socket } from 'socket.io';

export type SocketWithUser = Socket & { user: User }
