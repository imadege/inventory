import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from './entities/inventory.entity';
import { PreferenceService } from './preference/preference.service';
import { Preference } from './entities/preference.entity';
import { PreferenceController } from './preference/preference.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Preference])],
  providers: [InventoryService, PreferenceService],
  controllers: [InventoryController, PreferenceController],
})
export class InventoryModule {}
