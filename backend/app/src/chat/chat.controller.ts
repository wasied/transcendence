import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { Chat } from './chat';
import { Chats } from './chats';
import { ChatService } from './chatService';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get()
	async findAll(): Promise<Chats> {
		return this.chatService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Chat> {
		return this.chatService.find(id);
	}

	@Post()
	async create(@Body('chat') chat: Chat): Promise<void> {
		this.chatService.create(chat);
	}

	@Put()
	async update(@Body('chat') chat: Chat): Promise<void> {
		this.chatService.update(chat);
	}

	@Delete(':id')
	async delete(@Body('id') id: number, chat_user_id: number): Promise<void> {
		this.chatService.delete(id);
	}
}
