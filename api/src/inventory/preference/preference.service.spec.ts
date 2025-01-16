import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Preference } from '../entities/preference.entity';
import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
  let service: PreferenceService;
  let repository: ReturnType<typeof mockRepository>;

  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferenceService,
        {
          provide: getRepositoryToken(Preference), // Mock repository
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<PreferenceService>(PreferenceService);
    repository = module.get(getRepositoryToken(Preference));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all preferences', async () => {
    const mockPreferences = [
      { id: '1', material: 'Steel', form: 'Sheet', widthMin: 10, widthMax: 50 },
    ];
    repository.find.mockResolvedValue(mockPreferences);

    const result = await service.findAll();
    expect(result).toEqual(mockPreferences);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should create a new preference', async () => {
    const newPreference = {
      material: 'Steel',
      form: 'Sheet',
      choice: 'Hot Rolled',
      grade: 'A36',
      widthMin: 10,
      widthMax: 50,
    };
    repository.save.mockResolvedValue({ id: '1', ...newPreference });

    const result = await service.create(newPreference);
    expect(result).toEqual({ id: '1', ...newPreference });
    expect(repository.save).toHaveBeenCalledWith(newPreference);
  });
});
