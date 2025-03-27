# Kafka Consumer/Producer with NestJS

This repository contains a **NestJS** application that integrates **Kafka** for managing message consumers and producers using the KafkaJS library. It showcases how to build, test, and manage message flows.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

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
MONGODB_URI=mongodb+srv://gfyjd:xsqixPgVldGp8WAj@cluster0.pp6dzgx.mongodb.net/mydb?retryWrites=true&w=majority
# Kafka Configuration
KAFAKA_BROKER_URL=localhost:9092

# ELASTICSEARCH
ELASTICSEARCH_MESSAGE_INDEX=messages_index
ELASTICSEARCH_NODE=https://my-elasticsearch-project-e17cbb.es.us-east-1.aws.elastic.cloud:443
ELASTICSEARCH_API_KEY=c00yRjFwVUJ5bjN2SzJyMXFaTXI6YkxrQzJFUUhlcHA5b3Vuak00U3lwZw==
```
