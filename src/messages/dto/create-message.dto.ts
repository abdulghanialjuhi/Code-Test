import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    conversationId: string;

    @IsNotEmpty()
    @IsString()
    senderId: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    metadata?: Record<string, any>;
}