# Kafka Consumer/Producer with NestJS

This repository contains a **NestJS** application that integrates **Kafka** for managing message consumers and producers using the KafkaJS library. It showcases how to build, test, and manage message flows.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Tests](#tests)

## Project Overview

This project demonstrates the use of **KafkaJS** with **NestJS** to build an event-driven microservice architecture. It includes:
- Kafka consumers to listen to topics and process messages.
- Kafka producers to send messages to topics.
- Unit tests for testing Kafka consumer/producer services.
- Basic authentication and authorization integration.
- Multi-tenant architecture for future scalability.

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

Create a `.env` file in the root of the project and add the necessary Kafka, MongoDB, Elasticsearch, and other application configurations. Below is an example of the required environment variables:

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

The project is structured to manage Kafka consumers, producers, and Elasticsearch. Below is the high-level structure:

```bash
src/
│
├── elasticsearch/                 
│   ├── elasticsearch.module.ts 
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

## Architecture Decisions

This project was designed with scalability in mind, using a **multi-tenant** architecture to support future scaling. Key architectural decisions include:

- **Kafka for Asynchronous Communication**: Kafka is used for decoupled communication between services, improving scalability and fault tolerance.
- **Multi-Tenant Architecture**: The application is designed to support multiple tenants in the future. This is achieved through MongoDB, Elasticsearch, and Kafka configurations tailored to handle different tenants by dynamically determining the connection and tenant-related logic.
- **Elasticsearch for Fast Search Capabilities**: Elasticsearch is integrated to enable fast indexing and searching of messages, ensuring high performance for query-heavy operations.
- **MongoDB for Tenant Data Isolation**: MongoDB has been set up in such a way that it can support multiple tenants in the future, ensuring data isolation and compliance with multi-tenancy principles.
- **Authentication & Authorization**: Basic authentication and authorization mechanisms are implemented to secure API endpoints and ensure only authorized users have access to the system.

## Tests


Testing strategy includes:

1. **Unit Testing**: Tests for each service, ensuring components work in isolation.
2. **Integration Testing**: Verifies the communication between services, Kafka, and Elasticsearch.

To run the tests:

```bash
npm run test
```

---

This version includes architecture decisions focusing on multi-tenancy and security, as well as the testing strategy. Let me know if further modifications are needed!
