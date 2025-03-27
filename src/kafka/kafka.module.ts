import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Module({
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
