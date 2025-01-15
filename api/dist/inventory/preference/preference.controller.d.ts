import { PreferenceService } from './preference.service';
import { Preference } from '../entities/preference.entity';
import { Inventory } from '../entities/inventory.entity';
export declare class PreferenceController {
    private readonly preferenceService;
    constructor(preferenceService: PreferenceService);
    findAll(): Promise<Preference[]>;
    findOne(id: string): Promise<Preference>;
    create(data: Partial<Preference>): Promise<Preference>;
    update(id: string, data: Partial<Preference>): Promise<Preference>;
    remove(id: string): Promise<void>;
    uploadInventoryFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    getInventoriesByPreference(id: string, page: number, limit: number): Promise<{
        data: Inventory[];
        total: number;
        page: number;
        limit: number;
    }>;
}
