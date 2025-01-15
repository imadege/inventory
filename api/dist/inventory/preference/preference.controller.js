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
exports.PreferenceController = void 0;
const common_1 = require("@nestjs/common");
const streamifier = require("streamifier");
const swagger_1 = require("@nestjs/swagger");
const csv = require("csv-parser");
const platform_express_1 = require("@nestjs/platform-express");
const preference_service_1 = require("./preference.service");
let PreferenceController = class PreferenceController {
    constructor(preferenceService) {
        this.preferenceService = preferenceService;
    }
    findAll() {
        return this.preferenceService.findAll();
    }
    findOne(id) {
        return this.preferenceService.findOne(id);
    }
    create(data) {
        return this.preferenceService.create(data);
    }
    update(id, data) {
        return this.preferenceService.update(id, data);
    }
    remove(id) {
        return this.preferenceService.remove(id);
    }
    async uploadInventoryFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const results = [];
        return new Promise((resolve, reject) => {
            streamifier
                .createReadStream(file.buffer)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                try {
                    await this.preferenceService.processPreferenceCsv(results);
                    resolve({ message: 'File processed successfully' });
                }
                catch (error) {
                    console.log(error);
                    reject(new common_1.BadRequestException('Error processing file'));
                }
            })
                .on('error', (error) => {
                reject(new common_1.BadRequestException(`Error reading file: ${error.message}`));
            });
        });
    }
    async getInventoriesByPreference(id, page, limit) {
        return this.preferenceService.getInventoriesByPreference(id, Number(page) || 1, Number(limit) || 10);
    }
};
exports.PreferenceController = PreferenceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "uploadInventoryFile", null);
__decorate([
    (0, common_1.Get)(':id/inventories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated inventories based on a preference' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page (default: 10)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "getInventoriesByPreference", null);
exports.PreferenceController = PreferenceController = __decorate([
    (0, common_1.Controller)('preferences'),
    __metadata("design:paramtypes", [preference_service_1.PreferenceService])
], PreferenceController);
//# sourceMappingURL=preference.controller.js.map