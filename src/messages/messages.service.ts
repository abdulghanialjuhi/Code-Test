import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
import { MyElasticsearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel('Message') private readonly messageModel: Model<Message>,
        private readonly elasticSearchService: MyElasticsearchService,
    ) {}


    async createMessage(createMessageDto: any): Promise<Message> {
        const newMessage = new this.messageModel(createMessageDto);
        return newMessage.save();
    }

    async getMessages(conversationId: string, page: number, limit: number, sort: string) {
        const skip = (page - 1) * limit;
        return this.messageModel
            .find({ conversationId })
            .sort({ timestamp: sort === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }


    // src/messages/messages.service.ts
    async searchMessages(index: string, conversationId: string, query: string, page: number, limit: number) {
        const response = await this.elasticSearchService.search(index, {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "conversationId": conversationId } },
                        { "match": { "content": query } }
                    ]
                }
            },
            from: page ? (page - 1) * limit : 0,
            size: limit || 10,
        });

        return response;
    }

}
