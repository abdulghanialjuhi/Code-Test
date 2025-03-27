import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { MyElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(
        private readonly consumerService: ConsumerService, 
        private readonly elasticSearchService: MyElasticsearchService,
        private readonly configService: ConfigService,
    ) {}

  async onModuleInit() {
    await this.consumerService.consume(
        { topics: ['message.created'] },
        {
        eachMessage: async ({ topic, partition, message }) => {
            const messageValue = message.value ? JSON.parse(message.value.toString('utf-8')) : ''
            
            console.log('messaging: ', {
                topic: topic.toString(),
                partition: partition.toString(),
            });
            await this.elasticSearchService.indexDocument(
                this.configService.get<string>('ELASTICSEARCH_MESSAGE_INDEX') || 'default_index',
                messageValue,
            );
        },
    });
  }
}