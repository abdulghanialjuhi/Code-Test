import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConfigService } from '@nestjs/config';
import { ProducerService } from '../kafka/producer.service';

@Controller('api/messages')
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService, 
        private readonly producerService: ProducerService,
    ) {}

    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        const message = await this.messagesService.createMessage(createMessageDto);
        // Publish to Kafka
        await this.producerService.produce({
            topic: 'message.created',
            messages: [
                { value: JSON.stringify(message) },
            ],
        });
        return message;
    }


}

@Controller('api/conversations/:conversationId/messages')
export class ConversationsController {

    constructor(
        private readonly messagesService: MessagesService,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    async getMessages(
        @Param('conversationId') conversationId: string,
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('sort') sort: string,
    ) {
        return this.messagesService.getMessages(conversationId, page, limit, sort);
    }

    @Get('search')
    async searchMessages(
        @Param('conversationId') conversationId: string,
        @Query('q') query: string,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        const index = this.configService.get<string>('ELASTICSEARCH_MESSAGE_INDEX') || 'default_index'

        return this.messagesService.searchMessages(index, conversationId, query, page, limit);
    }


}

