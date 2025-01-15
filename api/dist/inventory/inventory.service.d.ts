import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    findAll(): Promise<Inventory[]>;
    findAllPaginated(page?: number, limit?: number): Promise<{
        data: Inventory[];
        total: number;
        page: number;
        limit: number;
        totalTons: number;
    }>;
    findOne(id: string): Promise<Inventory>;
    create(data: Partial<Inventory>): Promise<Inventory>;
    update(id: string, data: Partial<Inventory>): Promise<Inventory>;
    remove(id: string): Promise<void>;
    processInventoryCsv(data: any[]): Promise<void>;
}
