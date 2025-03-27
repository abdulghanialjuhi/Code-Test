import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class MyElasticsearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async createIndex(index: string) {
        const response = await this.elasticsearchService.indices.create({ index });
        return response;
    }

    async indexDocument(index: string, document: any) {
        const { _id, ...body } = document;
        return this.elasticsearchService.index({
            index,
            id: _id,
            body,
        });
    }

    async search(index: string, query: any) {
        const response = await this.elasticsearchService.search({
            index,
            ...query,
        });
        return response.hits.hits;
    }
}
