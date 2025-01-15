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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Inventory = class Inventory {
    get dimension() {
        const parts = [];
        if (this.length !== null)
            parts.push(`L=${this.length}`);
        if (this.width !== null)
            parts.push(`W=${this.width}`);
        if (this.height !== null)
            parts.push(`H=${this.height}`);
        if (this.thickness !== null)
            parts.push(`T=${this.thickness}`);
        if (this.outerDiameter !== null)
            parts.push(`OD=${this.outerDiameter}`);
        if (this.wallThickness !== null)
            parts.push(`Wt=${this.wallThickness}`);
        if (this.webThickness !== null)
            parts.push(`Tw=${this.webThickness}`);
        if (this.flangeThickness !== null)
            parts.push(`Tf=${this.flangeThickness}`);
        return parts.length > 0 ? parts.join(', ') : null;
    }
    ;
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the inventory item' }),
    __metadata("design:type", String)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Product number of the inventory item' }),
    __metadata("design:type", String)
], Inventory.prototype, "productNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Material of the product' }),
    __metadata("design:type", String)
], Inventory.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Form of the product (e.g., sheet, rod, etc.)' }),
    __metadata("design:type", String)
], Inventory.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Choice or type of the product' }),
    __metadata("design:type", String)
], Inventory.prototype, "choice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Grade of the product material' }),
    __metadata("design:type", String)
], Inventory.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Surface type of the product' }),
    __metadata("design:type", String)
], Inventory.prototype, "surface", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Finish of the product (e.g., polished, matte)' }),
    __metadata("design:type", String)
], Inventory.prototype, "finish", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Length of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Width of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Height of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Thickness of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "thickness", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Outer diameter of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "outerDiameter", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Wall thickness of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "wallThickness", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Web thickness of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "webThickness", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Flange thickness of the product (optional)',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "flangeThickness", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Quantity of the product in inventory' }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 3 }),
    (0, swagger_1.ApiProperty)({
        description: 'Weight of the product in tons',
        example: 12.345,
    }),
    __metadata("design:type", Number)
], Inventory.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Location of the product in the warehouse' }),
    __metadata("design:type", String)
], Inventory.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Certificates associated with the product' }),
    __metadata("design:type", String)
], Inventory.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Date the inventory item was created' }),
    __metadata("design:type", Date)
], Inventory.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Date the inventory item was last updated' }),
    __metadata("design:type", Date)
], Inventory.prototype, "lastUpdated", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('inventory')
], Inventory);
//# sourceMappingURL=inventory.entity.js.map