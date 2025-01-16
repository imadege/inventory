import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let controller: InventoryController;
  let service: Partial<InventoryService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: '1',
          productNumber: '12345',
          form: 'Sheet',
          totalWeight: '100.5',
        },
      ]),
      create: jest.fn().mockResolvedValue({
        id: '1',
        productNumber: '12345',
        form: 'Sheet',
        totalWeight: '100.5',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService, // Mock service
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all inventory items', async () => {
    const result = await controller.findAllPaginated();
    expect(result).toEqual([
      { id: '1', productNumber: '12345', form: 'Sheet', totalWeight: '100.5' },
    ]);
  });

  it('should create a new inventory item', async () => {
    const newInventory = {
      productNumber: '12345',
      form: 'Sheet',
      totalWeight: '100.5',
    };
    const result = await controller.create(newInventory);
    expect(result).toEqual({ id: '1', ...newInventory });
  });
});
