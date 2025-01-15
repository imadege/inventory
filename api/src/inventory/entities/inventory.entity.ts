import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the inventory item' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Product number of the inventory item' })
  productNumber: string;

  @Column()
  @ApiProperty({ description: 'Material of the product' })
  material: string;

  @Column()
  @ApiProperty({ description: 'Form of the product (e.g., sheet, rod, etc.)' })
  form: string;

  @Column()
  @ApiProperty({ description: 'Choice or type of the product' })
  choice: string;

  @Column()
  @ApiProperty({ description: 'Grade of the product material' })
  grade: string;

  @Column()
  @ApiProperty({ description: 'Surface type of the product' })
  surface: string;

  @Column()
  @ApiProperty({ description: 'Finish of the product (e.g., polished, matte)' })
  finish: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Length of the product (optional)',
    nullable: true,
  })
  length: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Width of the product (optional)',
    nullable: true,
  })
  width: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Height of the product (optional)',
    nullable: true,
  })
  height: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Thickness of the product (optional)',
    nullable: true,
  })
  thickness: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Outer diameter of the product (optional)',
    nullable: true,
  })
  outerDiameter: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Wall thickness of the product (optional)',
    nullable: true,
  })
  wallThickness: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Web thickness of the product (optional)',
    nullable: true,
  })
  webThickness: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Flange thickness of the product (optional)',
    nullable: true,
  })
  flangeThickness: number;

  @Column()
  @ApiProperty({ description: 'Quantity of the product in inventory' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  @ApiProperty({
    description: 'Weight of the product in tons',
    example: 12.345,
  })
  weight: number;

  @Column()
  @ApiProperty({ description: 'Location of the product in the warehouse' })
  location: string;

  @Column()
  @ApiProperty({ description: 'Certificates associated with the product' })
  certificates: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date the inventory item was created' })
  createDate: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date the inventory item was last updated' })
  lastUpdated: Date;

  get dimension(): string | null {
    const parts: string[] = [];

    if (this.length !== null) parts.push(`L=${this.length}`);
    if (this.width !== null) parts.push(`W=${this.width}`);
    if (this.height !== null) parts.push(`H=${this.height}`);
    if (this.thickness !== null) parts.push(`T=${this.thickness}`);
    if (this.outerDiameter !== null) parts.push(`OD=${this.outerDiameter}`);
    if (this.wallThickness !== null) parts.push(`Wt=${this.wallThickness}`);
    if (this.webThickness !== null) parts.push(`Tw=${this.webThickness}`);
    if (this.flangeThickness !== null) parts.push(`Tf=${this.flangeThickness}`);
    return parts.length > 0 ? parts.join(', ') : null; // Concatenate with ', '
  };
}
