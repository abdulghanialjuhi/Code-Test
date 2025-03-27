import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MyElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          node: configService.get<string>('ELASTICSEARCH_NODE'),
          auth: {
            apiKey: configService.get<string>('ELASTICSEARCH_API_KEY') || '',
          },
        }
      ),
      inject: [ConfigService],
    }),
  ],
  providers: [MyElasticsearchService],
  exports: [MyElasticsearchService],
})
export class MyElasticsearchModule {}
