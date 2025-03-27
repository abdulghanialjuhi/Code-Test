# Kafka Consumer/Producer with NestJS

This repository contains a **NestJS** application that integrates **Kafka** for managing message consumers and producers using the KafkaJS library. It showcases how to build, test, and manage message flows.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Project Overview

This project demonstrates the use of **KafkaJS** with **NestJS** to build an event-driven microservice architecture. It includes:
- Kafka consumers to listen to topics and process messages.
- Kafka producers to send messages to topics.
- Unit tests for testing Kafka consumer/producer services.

## Installation

To set up the project on your local environment:

1. **Clone the repository:**

    ```bash
    git clone git@github.com:abdulghanialjuhi/Code-Test.git
    cd Code-Test
    ```

2. **Install dependencies:**

    This project uses **Yarn** for dependency management. If you don't have Yarn installed.

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of the project and add the necessary Kafka and application configurations. Below is an example of the required environment variables:

```bash
# MongoDB
MONGODB_URI=your-mongodb-uri
# Kafka Configuration
KAFAKA_BROKER_URL=localhost:9092

# ELASTICSEARCH
ELASTICSEARCH_MESSAGE_INDEX=messages_index
ELASTICSEARCH_NODE=your-es-url
ELASTICSEARCH_API_KEY=your-es-api-key
```

## Project Structure

Create a `.env` file in the root of the project and add the necessary Kafka and application configurations. Below is an example of the required environment variables:

```bash
src/
│
├── elasticsearch/                 
│   ├── elasticsearch.module 
│   ├── elasticsearch.service.ts 
├── kafka/                 
│   ├── consumer.service.ts 
│   ├── kafka.module.ts 
│   ├── producer.service.ts 
│
├── messages/              
│   ├── message.consume.ts
|       ├── dto/
            ├── create-message.dto.ts
|       ├── interfaces/
            ├── message.interface.ts
|       ├── schemas/
            ├── message.schema.ts
│   ├── message.consume.ts
│   ├── messages.controller.ts
│   ├── messages.module.ts
│   ├── messages.service.ts 
├── app.controller.ts  
├── app.service.ts  
├── app.module.ts  
├── main.ts                
└── ...

```
