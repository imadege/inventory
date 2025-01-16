import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inventory } from '../../entities/inventory.entity';
import { InventoryService } from './inventory.service';
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
describe('InventoryService', () => {
  let service: InventoryService;
  let repository: ReturnType<typeof mockRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(Inventory), // Mock repository
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    repository = module.get(getRepositoryToken(Inventory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all inventory items', async () => {
    const mockInventory = [
      { id: '1', productNumber: '12345', form: 'Sheet', totalWeight: '100.5' },
    ];
    repository.find.mockResolvedValue(mockInventory);

    const result = await service.findAll();
    expect(result).toEqual(mockInventory);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should create a new inventory item', async () => {
    const newInventory = {
      productNumber: '12345',
      form: 'Sheet',
      totalWeight: '100.5',
    };
    repository.save.mockResolvedValue({ id: '1', ...newInventory });

    const result = await service.create(newInventory);
    expect(result).toEqual({ id: '1', ...newInventory });
    expect(repository.save).toHaveBeenCalledWith(newInventory);
  });
});
