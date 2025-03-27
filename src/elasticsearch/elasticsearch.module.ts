import { Module, Scope } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MyElasticsearchService } from './elasticsearch.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Module({
	imports: [
		ConfigModule,
		ElasticsearchModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService, REQUEST],
			useFactory: async (configService: ConfigService, req: Request) => {
				const tenantId = req?.headers['x-tenant-id'] || 'default';
				// we can change this to fetch the node from a database or any other source
				const node = configService.get<string>(`ELASTICSEARCH_NODE_${tenantId}`) || configService.get<string>('ELASTICSEARCH_NODE');
				const apiKey = configService.get<string>(`ELASTICSEARCH_API_KEY_${tenantId}`) || configService.get<string>('ELASTICSEARCH_API_KEY') || '';

				return {
					node,
					auth: apiKey ? { apiKey } : undefined,
				};
			},
		}),
	],
	providers: [
		{
			provide: MyElasticsearchService,
			useClass: MyElasticsearchService,
			scope: Scope.REQUEST, // Ensure each request can have its tenant context
		},
	],
	exports: [MyElasticsearchService],
})
export class MyElasticsearchModule {}
