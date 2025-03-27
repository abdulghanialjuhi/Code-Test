import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka: Kafka;
  private readonly consumers: Consumer[] = [];

  constructor(private readonly configService: ConfigService) {
    // we can use same approach as elasticsearch module to support multi-tenancy
    const kafkaBroker = this.configService.get<string>('KAFKA_BROKER', 'localhost:9092');
    this.kafka = new Kafka({
      brokers: [kafkaBroker],
    });
  }

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig, groupId: string) {
    const consumer = this.kafka.consumer({ groupId: groupId });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}