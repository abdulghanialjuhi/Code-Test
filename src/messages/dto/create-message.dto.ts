import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty({ message: 'conversationId is required' })
    @IsString({ message: 'conversationId must be a string' })
    conversationId: string;

    @IsNotEmpty({ message: 'senderId is required' })
    @IsString({ message: 'senderId must be a string' })
    senderId: string;

    @IsNotEmpty({ message: 'content is required' })
    @IsString({ message: 'content must be a string' })
    content: string;

    metadata?: Record<string, any>;
}