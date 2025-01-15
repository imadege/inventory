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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("./entities/inventory.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    findAll() {
        return this.inventoryRepository.find();
    }
    async findAllPaginated(page = 1, limit = 10) {
        const queryBuilder = await this.inventoryRepository.createQueryBuilder('inventory');
        const totalTons = await queryBuilder
            .select('SUM(inventory.weight)', 'total')
            .getRawOne();
        console.log(totalTons);
        const [data, total] = await this.inventoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
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
    findOne(id) {
        return this.inventoryRepository.findOneBy({ id });
    }
    create(data) {
        const inventory = this.inventoryRepository.create(data);
        return this.inventoryRepository.save(inventory);
    }
    async update(id, data) {
        await this.inventoryRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.inventoryRepository.delete(id);
    }
    async processInventoryCsv(data) {
        const inventories = data.map((row) => {
            const inventory = new inventory_entity_1.Inventory();
            inventory.productNumber = row.productNumber;
            inventory.material = row.material;
            inventory.finish = row.finish;
            inventory.form = row.form;
            inventory.choice = row.choice;
            inventory.grade = row.grade;
            inventory.surface = row.surface;
            inventory.finish = row.finish;
            inventory.length = row.length ? parseFloat(row.length) : null;
            inventory.width = row.width ? parseFloat(row.width) : null;
            inventory.height = row.height ? parseFloat(row.height) : null;
            inventory.quantity = row.quantity ? parseInt(row.quantity, 10) : 0;
            inventory.weight = row.weight ? parseFloat(row.weight) : 0;
            inventory.location = row.location;
            inventory.thickness = row.thickness ? parseFloat(row.thickness) : null;
            inventory.certificates = row.certificates;
            inventory.wallThickness = row.wallThickness
                ? parseFloat(row.wallThickness)
                : null;
            inventory.webThickness = row.webThickness;
            inventory.flangeThickness = row.flangeThickness;
            return inventory;
        });
        await this.inventoryRepository.save(inventories);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map