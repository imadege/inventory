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
import * as csv from 'csv-parser';
import * as streamifier from 'streamifier';
//import { createReadStream } from 'fs';
//import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all inventory items' })
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
  async findAllPaginated(
    @Query('page') page: number, // Page number from query string
    @Query('limit') limit: number, // Limit per page from query string
  ): Promise<{
    data: Inventory[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Convert query parameters to numbers and pass to the service
    return this.inventoryService.findAllPaginated(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  /**@Get()
  @ApiOperation({ summary: 'Retrieve all inventory items' })
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }**/

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific inventory item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the inventory item to retrieve' })
  findOne(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new inventory item' })
  @ApiBody({ type: Inventory })
  create(@Body() data: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing inventory item' })
  @ApiParam({ name: 'id', description: 'ID of the inventory item to update' })
  @ApiBody({ type: Inventory })
  update(
    @Param('id') id: string,
    @Body() data: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the inventory item to delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.inventoryService.remove(id);
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
            await this.inventoryService.processInventoryCsv(results);
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
}
