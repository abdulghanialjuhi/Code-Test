import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { ConversationsController, MessagesController } from './messages.controller';
import { MessageSchema } from './schemas/message.schema';
import { TestConsumer } from './message.consume';
import { ConsumerService } from '../kafka/consumer.service';
import { MyElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),  // Register the model here
        MyElasticsearchModule,
        KafkaModule,
    ],
    providers: [MessagesService, TestConsumer, ConsumerService],
    controllers: [MessagesController, ConversationsController],
})
export class MessagesModule {}
