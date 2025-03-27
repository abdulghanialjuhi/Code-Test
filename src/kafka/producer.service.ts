import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {

    private readonly kafka: Kafka;
    private readonly producers;

    constructor(private readonly configService: ConfigService) {
        // we can use same approach as elasticsearch module to support multi-tenancy
        const kafkaBroker = this.configService.get<string>('KAFKA_BROKER', 'localhost:9092');
        this.kafka = new Kafka({
            brokers: [kafkaBroker],
        });
        this.producers = this.kafka.producer();
    }

    async onModuleInit() {
        await this.producers.connect()
    }

    async produce(record: ProducerRecord) {
        await this.producers.send(record);
    }

    async onApplicationShutdown() {
        await this.producers.disconnect();
    }
}