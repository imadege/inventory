import { Repository } from 'typeorm';
import { Preference } from '../entities/preference.entity';
import { Inventory } from '../entities/inventory.entity';
export declare class PreferenceService {
    private readonly preferenceRepository;
    private readonly inventoryRepository;
    constructor(preferenceRepository: Repository<Preference>, inventoryRepository: Repository<Inventory>);
    findAll(): Promise<Preference[]>;
    findOne(id: string): Promise<Preference>;
    create(data: Partial<Preference>): Promise<Preference>;
    update(id: string, data: Partial<Preference>): Promise<Preference>;
    remove(id: string): Promise<void>;
    processPreferenceCsv(data: any[]): Promise<void>;
    getInventoriesByPreference(preferenceId: string, page?: number, limit?: number): Promise<{
        data: Inventory[];
        total: number;
        page: number;
        limit: number;
        totalTons?: number;
    }>;
}
