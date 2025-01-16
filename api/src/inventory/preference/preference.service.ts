import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preference } from '../entities/preference.entity';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  // Retrieve all preferences
  findAll(): Promise<Preference[]> {
    return this.preferenceRepository.find();
  }

  // Retrieve a specific preference by ID
  findOne(id: string): Promise<Preference> {
    return this.preferenceRepository.findOneBy({ id });
  }

  // Create a new preference
  create(data: Partial<Preference>): Promise<Preference> {
    const preference = this.preferenceRepository.create(data);
    return this.preferenceRepository.save(preference);
  }

  // Update an existing preference by ID
  async update(id: string, data: Partial<Preference>): Promise<Preference> {
    await this.preferenceRepository.update(id, data);
    return this.findOne(id);
  }

  // Delete a preference by ID
  async remove(id: string): Promise<void> {
    await this.preferenceRepository.delete(id);
  }

  async processPreferenceCsv(data: any[]): Promise<void> {
    const preferences = data.map((row) => {
      const preference = new Preference();
      preference.material = row.material;
      preference.form = row.form;
      preference.choice = row.choice;
      preference.grade = row.grade;
      preference.widthMin = parseFloat(row.widthMin) || null;
      preference.widthMax = parseFloat(row.widthMax) || null;
      preference.thickenessMin = parseFloat(row.thickenessMin) || null;
      preference.thickenessMax = parseFloat(row.thickenessMax) || null;
      return preference;
    });
    console.log(preferences.length);
    await this.preferenceRepository.save(preferences);
  }

  /**
   * Get inventories based on a user's preferences and weight > 10 tons.
   * @param preferenceId - ID of the preference to match inventories.
   */

  async getInventoriesByPreference(
    preferenceId: string,
    page: number = 1, // Default page is 1
    limit: number = 10, // Default limit is 10
  ): Promise<{
    data: Inventory[];
    total: number;
    page: number;
    limit: number;
    totalTons?: number;
  }> {
    // Fetch the preference
    const preference = await this.preferenceRepository.findOneBy({
      id: preferenceId,
    });

    if (!preference) {
      throw new Error(`Preference with ID ${preferenceId} not found.`);
    }

    // Build query conditions based on the preference
    const query = this.inventoryRepository.createQueryBuilder('inventory');

    if (preference.material) {
      query.andWhere('inventory.material = :material', {
        material: preference.material,
      });
    }

    if (preference.form) {
      query.andWhere('inventory.form = :form', { form: preference.form });
    }

    if (preference.choice) {
      query.andWhere('inventory.choice = :choice', {
        choice: preference.choice,
      });
    }

    if (preference.grade) {
      query.andWhere('inventory.grade = :grade', { grade: preference.grade });
    }

    if (preference.widthMin && preference.widthMax) {
      query.andWhere('inventory.width BETWEEN :widthMin AND :widthMax', {
        widthMin: preference.widthMin,
        widthMax: preference.widthMax,
      });
    }

    if (preference.thickenessMin && preference.thickenessMax) {
      query.andWhere(
        'inventory.thickness BETWEEN :thickenessMin AND :thickenessMax',
        {
          thickenessMin: preference.thickenessMin,
          thickenessMax: preference.thickenessMax,
        },
      );
    }

    // Add condition for weight > 10 tons
    query.andWhere('inventory.weight > :weight', { weight: 10 });

    const totalQuery = query.clone();
    // Apply pagination
    query.skip((page - 1) * limit).take(limit);

    const totalTons = await totalQuery
      .select('SUM(inventory.weight)', 'totalTons')
      .getRawOne();

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalTons: parseFloat(totalTons.totalTons || '0'),
    };
  }
}
