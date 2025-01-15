import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import * as streamifier from 'streamifier';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import * as csv from 'csv-parser';
import { FileInterceptor } from '@nestjs/platform-express';
import { PreferenceService } from './preference.service';
import { Preference } from '../entities/preference.entity';
import { Inventory } from '../entities/inventory.entity';

@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  findAll(): Promise<Preference[]> {
    return this.preferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Preference> {
    return this.preferenceService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Preference>): Promise<Preference> {
    return this.preferenceService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Preference>,
  ): Promise<Preference> {
    return this.preferenceService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.preferenceService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadInventoryFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
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
          } catch (error) {
            console.log(error);
            reject(new BadRequestException('Error processing file'));
          }
        })
        .on('error', (error) => {
          reject(
            new BadRequestException(`Error reading file: ${error.message}`),
          );
        });
    });
  }

  @Get(':id/inventories')
  @ApiOperation({ summary: 'Get paginated inventories based on a preference' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
  })
  async getInventoriesByPreference(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{
    data: Inventory[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.preferenceService.getInventoriesByPreference(
      id,
      Number(page) || 1,
      Number(limit) || 10,
    );
  }
}
