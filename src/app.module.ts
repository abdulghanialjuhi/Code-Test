import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { TestConsumer } from './messages/message.consume';
import { KafkaModule } from './kafka/kafka.module';
import { MyElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, REQUEST],
      useFactory: async (configService: ConfigService, req: Request) => {
        // we can use this approach to support multi-tenancy
        const tenantId = req?.headers['x-tenant-id'] || 'default';
        const mongoUri = configService.get<string>(`MONGODB_URI_${tenantId}`) || configService.get<string>('MONGODB_URI');

        return {
          uri: mongoUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000, 
          connectTimeoutMS: 5000,
        };
      },
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
