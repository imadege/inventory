"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const preference_entity_1 = require("../entities/preference.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
let PreferenceService = class PreferenceService {
    constructor(preferenceRepository, inventoryRepository) {
        this.preferenceRepository = preferenceRepository;
        this.inventoryRepository = inventoryRepository;
    }
    findAll() {
        return this.preferenceRepository.find();
    }
    findOne(id) {
        return this.preferenceRepository.findOneBy({ id });
    }
    create(data) {
        const preference = this.preferenceRepository.create(data);
        return this.preferenceRepository.save(preference);
    }
    async update(id, data) {
        await this.preferenceRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.preferenceRepository.delete(id);
    }
    async processPreferenceCsv(data) {
        const preferences = data.map((row) => {
            const preference = new preference_entity_1.Preference();
            preference.material = row.material;
            preference.form = row.form;
            preference.choice = row.choice;
            preference.grade = row.grade;
            preference.widthMin = row.widthMin;
            preference.widthMax = row.widthMax;
            preference.thickenessMin = row.thickenessMin;
            preference.thickenessMax = row.thickenessMax;
            return preference;
        });
        console.log(preferences.length);
        await this.preferenceRepository.save(preferences);
    }
    async getInventoriesByPreference(preferenceId, page = 1, limit = 10) {
        const preference = await this.preferenceRepository.findOneBy({
            id: preferenceId,
        });
        if (!preference) {
            throw new Error(`Preference with ID ${preferenceId} not found.`);
        }
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
            query.andWhere('inventory.thickness BETWEEN :thickenessMin AND :thickenessMax', {
                thickenessMin: preference.thickenessMin,
                thickenessMax: preference.thickenessMax,
            });
        }
        query.andWhere('inventory.weight > :weight', { weight: 10 });
        const totalQuery = query.clone();
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
};
exports.PreferenceService = PreferenceService;
exports.PreferenceService = PreferenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(preference_entity_1.Preference)),
    __param(1, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PreferenceService);
//# sourceMappingURL=preference.service.js.map