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
    git clone https://github.com/yourusername/your-repository.git
    cd your-repository
    ```

2. **Install dependencies:**

    This project uses **Yarn** for dependency management. If you don't have Yarn installed, [install Yarn](https://yarnpkg.com/getting-started/install) first.

    ```bash
    yarn install
    ```

## Environment Variables

Create a `.env` file in the root of the project and add the necessary Kafka and application configurations. Below is an example of the required environment variables:

```bash
# Kafka Configuration
KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=message-management
KAFKA_GROUP_ID=message-management-group

# Other Configuration
NODE_ENV=development
