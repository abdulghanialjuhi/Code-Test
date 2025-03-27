import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { MyElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Model } from 'mongoose';
import { Message } from './interfaces/message.interface';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageModel: Model<Message>;
  let elasticSearchService: MyElasticsearchService;

  const mockMessageModel = {
    save: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

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
    messageModel = module.get<Model<Message>>(getModelToken('Message'));
    elasticSearchService = module.get<MyElasticsearchService>(MyElasticsearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create and save a new message', async () => {
      const createMessageDto = { content: 'Hello World', conversationId: '12345' };
      const savedMessage = { _id: '1', ...createMessageDto };
      messageModel.create = jest.fn().mockResolvedValue(savedMessage);

      const result = await service.createMessage(createMessageDto);

      expect(result).toEqual(savedMessage);
      expect(messageModel.create).toHaveBeenCalledWith(createMessageDto);
    });
  });

});
