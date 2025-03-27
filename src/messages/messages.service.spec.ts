import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './interfaces/message.interface';
import { MyElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { CreateMessageDto } from './dto/create-message.dto';

import { MessagesController } from './messages.controller';
import { ProducerService } from '../kafka/producer.service';

describe('MessagesService', () => {
    let service: MessagesService;
    let model: Model<Message>;
    let elasticSearchService: MyElasticsearchService;

    // Mock the Mongoose Model
    const mockSave = jest.fn(); // Mock save function
    const mockMessageModel = jest.fn().mockImplementation(() => ({
        save: mockSave,
    }));

    // Mock Elasticsearch Service
    const mockElasticSearchService = {
        search: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            MessagesService,
            {
            provide: getModelToken('Message'),
            useValue: mockMessageModel,
            },
            {
            provide: MyElasticsearchService,
            useValue: mockElasticSearchService,
            },
        ],
        }).compile();

        service = module.get<MessagesService>(MessagesService);
        model = module.get<Model<Message>>(getModelToken('Message'));
        elasticSearchService = module.get<MyElasticsearchService>(MyElasticsearchService);
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMessage', () => {
    it('should save a new message', async () => {
      // Arrange
      const createMessageDto = { content: 'Hello', conversationId: '123', senderId: '456' };
      const savedMessage = { _id: 'mockId', ...createMessageDto };

      // Mock save function to return the saved message
      mockSave.mockResolvedValue(savedMessage);

      // Act
      const result = await service.createMessage(createMessageDto);

      // Assert
      expect(mockMessageModel).toHaveBeenCalledWith(createMessageDto); // Ensure constructor is called with correct data
      expect(mockSave).toHaveBeenCalledTimes(1); // Ensure save is called once
      expect(result).toEqual(savedMessage); // Ensure the result matches the expected saved message
    });
  });

  it('should throw an error if conversationId is missing', async () => {
    // Arrange
    const createMessageDto = new CreateMessageDto();
    createMessageDto.senderId = '456';
    createMessageDto.content = 'Hello';

  
    // Act & Assert
    await expect(service.createMessage(createMessageDto))
      .rejects
      .toThrow();
  });

  it('should throw an error if senderId is missing', async () => {
    // Arrange
    const createMessageDto = new CreateMessageDto();
    createMessageDto.conversationId = '123';
    createMessageDto.content = 'Hello';
  
    // Act & Assert
    await expect(service.createMessage(createMessageDto as CreateMessageDto))
      .rejects
      .toThrow();
  });

  it('should throw an error if content is missing', async () => {
    // Arrange
    const createMessageDto = new CreateMessageDto();
    createMessageDto.conversationId = '123';
    createMessageDto.senderId = '432';
  
    // Act & Assert
    await expect(service.createMessage(createMessageDto as CreateMessageDto))
      .rejects
      .toThrow();
  });
  it('should throw an error if conversationId is an empty string', async () => {
    // Arrange
    const createMessageDto = new CreateMessageDto();
    createMessageDto.conversationId = '';
    createMessageDto.senderId = 'Hello';
    createMessageDto.content = '5432';
  
    // Act & Assert
    await expect(service.createMessage(createMessageDto as CreateMessageDto))
      .rejects
      .toThrow();
  });
    
});



describe('MessagesController', () => {
  let controller: MessagesController;
  let messagesService: MessagesService;
  let producerService: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            createMessage: jest.fn(),
          },
        },
        {
          provide: ProducerService,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);
    producerService = module.get<ProducerService>(ProducerService);
  });

  it('should create a message and publish it to Kafka', async () => {
    // Arrange
    const createMessageDto: CreateMessageDto = {
      conversationId: '123',
      senderId: '456',
      content: 'Hello Kafka',
      metadata: { test: 'data' },
    };
    
    const mockMessage = {
      _id: 'mockMessageId',
      conversationId: '123',
      senderId: '456',
      content: 'Hello Kafka',
      timestamp: new Date(),
      metadata: { test: 'data' },
    };

    // Mock the service method to return the message
    jest.spyOn(messagesService, 'createMessage').mockResolvedValue(mockMessage);

    // Act
    const result = await controller.createMessage(createMessageDto);

    // Assert
    expect(messagesService.createMessage).toHaveBeenCalledWith(createMessageDto);
    expect(producerService.produce).toHaveBeenCalledWith({
      topic: 'message.created',
      messages: [
        { value: JSON.stringify(mockMessage) },
      ],
    });
    expect(result).toEqual(mockMessage);
  });
});
