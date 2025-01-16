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
            const data = [];
            for (let i = 0; i < results.length; i++) {
              if (results[i].length) {
                results[i].length = parseFloat(results[i].length);
              }
              if (results[i].width) {
                results[i].width = parseFloat(results[i].width);
              }
              if (results[i].height) {
                results[i].height = parseFloat(results[i].height);
              }
              if (results[i].quantity) {
                results[i].quantity = parseFloat(results[i].quantity);
              }
              if (results[i].weight) {
                results[i].weight = parseFloat(results[i].weight);
              }
              if (results[i].thickness) {
                results[i].thickness = parseFloat(results[i].thickness);
              }
              if (results[i].wallThickness) {
                results[i].wallThickness = parseFloat(results[i].wallThickness);
              }
              if (results[i].webThickness) {
                results[i].webThickness = parseFloat(results[i].webThickness);
              }
              if (results[i].flangeThickness) {
                results[i].flangeThickness = parseFloat(
                  results[i].flangeThickness,
                );
              }

              if (results[i].productNumber) {
                results[i].productNumber = results[i].productNumber;
              }

              if (results[i].material) {
                results[i].material = results[i].material;
              }

              if (results[i].finish) {
                results[i].finish = results[i].finish;
              }
              if (results[i].form) {
                results[i].form = results[i].form;
              }
              if (results[i].choice) {
                results[i].choice = results[i].choice;
              }
              if (results[i].grade) {
                results[i].grade = results[i].grade;
              }
              if (results[i].surface) {
                results[i].surface = results[i].surface;
              }
              if (results[i].certificates) {
                results[i].certificates = results[i].certificates;
              }
              //data.push(results[i]);
              console.log(results[i]);
              console.log('-----------------');
              await this.inventoryService.create(results[i]);

            }

            //await this.inventoryService.processInventoryCsv(results);
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
