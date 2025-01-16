import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  // Get all inventory items
  findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  async findAllPaginated(
    page: number = 1, // Default page is 1
    limit: number = 10, // Default limit is 10
  ): Promise<{
    data: Inventory[];
    total: number;
    page: number;
    limit: number;
    totalTons: number;
  }> {
    const queryBuilder =
      await this.inventoryRepository.createQueryBuilder('inventory');

    const totalTons = await queryBuilder
      .select('SUM(inventory.weight)', 'total')
      .getRawOne();
    console.log(totalTons);
    const [data, total] = await this.inventoryRepository.findAndCount({
      skip: (page - 1) * limit, // Calculate the number of records to skip
      take: limit, // Number of records to fetch
      order: {
        weight: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
      totalTons: parseFloat(totalTons.total || '0'),
    };
  }

  // Get a specific inventory item by ID
  findOne(id: string): Promise<Inventory> {
    return this.inventoryRepository.findOneBy({ id });
  }

  // Create a new inventory item
  create(data: Partial<Inventory>): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(data);
    return this.inventoryRepository.save(inventory);
  }

  getFloatValue(value: any): number | null {
    if (value === '') return null; // Empty string becomes null
    if (typeof value === 'string' && !isNaN(parseFloat(value))) {
      return parseFloat(value); // Convert numeric strings to floats
    }
    return null; // Return other valid values
  }

  // Update an inventory item
  async update(id: string, data: Partial<Inventory>): Promise<Inventory> {
    await this.inventoryRepository.update(id, data);
    return this.findOne(id);
  }

  // Delete an inventory item
  async remove(id: string): Promise<void> {
    await this.inventoryRepository.delete(id);
  }

  async processInventoryCsv(data: any[]): Promise<void> {
    const inventories = data.map((row) => {
      const inventory = new Inventory();
      inventory.productNumber = row.productNumber || '';
      inventory.material = row.material || '';
      inventory.finish = row.finish || '';
      inventory.form = row.form || '';
      inventory.choice = row.choice || '';
      inventory.grade = row.grade || '';
      inventory.surface = row.surface || '';
      inventory.finish = row.finish || '';
      inventory.length = row.length ? parseFloat(row.length) : null;
      inventory.width = row.width ? parseFloat(row.width) : null;
      inventory.height = row.height ? parseFloat(row.height) : null;
      inventory.quantity = row.quantity ? parseFloat(row.quantity) : 0.0;
      inventory.weight = row.weight ? parseFloat(row.weight) : 0.0;
      inventory.location = row.location || '';
      inventory.thickness = row.thickness ? parseFloat(row.thickness) : null;
      inventory.certificates = row.certificates || '';
      inventory.wallThickness = row.wallThickness
        ? parseFloat(row.wallThickness)
        : null;
      inventory.webThickness = row.webThickness
        ? parseFloat(row.webThickness)
        : null;
      inventory.flangeThickness = row.flangeThickness
        ? parseFloat(row.flangeThickness)
        : null;

      return inventory;
    });
    await this.inventoryRepository.save(inventories);
  }
}
