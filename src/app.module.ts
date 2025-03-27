import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { TestConsumer } from './messages/message.consume';
import { KafkaModule } from './kafka/kafka.module';
import { MyElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MessagesModule,
    KafkaModule,
    MyElasticsearchModule,
    KafkaModule,
  ],
  controllers: [AppController],  // Add new controller here
  providers: [AppService, TestConsumer], 
})
export class AppModule {}
