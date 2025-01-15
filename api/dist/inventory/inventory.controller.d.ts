import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAllPaginated(page: number, limit: number): Promise<{
        data: Inventory[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Inventory>;
    create(data: Partial<Inventory>): Promise<Inventory>;
    update(id: string, data: Partial<Inventory>): Promise<Inventory>;
    remove(id: string): Promise<void>;
    uploadInventoryFile(file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
