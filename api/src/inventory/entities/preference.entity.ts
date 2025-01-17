import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('preferences') // Table name in the database
export class Preference {
  @PrimaryGeneratedColumn('uuid') // UUID as the primary key
  id: string;

  @Column()
  material: string;

  @Column()
  form: string;

  @Column()
  choice: string;

  @Column()
  grade: string;

  @Column({ nullable: true })
  dimensions: string; // Optional, concatenated dimensions (e.g., L=100 W=50)

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
    transformer: {
      // Convert empty strings to null, and strings like "1.2" to floats
      to: (value: any) => {
        if (value === '') return null; // Empty string becomes null
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Convert numeric strings to floats
        }
        return value; // Return other valid values as-is
      },
      from: (value: any) => value,
    },
  })
  widthMin: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
    transformer: {
      // Convert empty strings to null, and strings like "1.2" to floats
      to: (value: any) => {
        if (value === '') return null; // Empty string becomes null
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Convert numeric strings to floats
        }
        return value; // Return other valid values as-is
      },
      from: (value: any) => value,
    },
  })
  widthMax: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
    transformer: {
      // Convert empty strings to null, and strings like "1.2" to floats
      to: (value: any) => {
        if (value === '') return null; // Empty string becomes null
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Convert numeric strings to floats
        }
        return value; // Return other valid values as-is
      },
      from: (value: any) => value,
    },
  })
  thickenessMin: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
    transformer: {
      // Convert empty strings to null, and strings like "1.2" to floats
      to: (value: any) => {
        if (value === '') return null; // Empty string becomes null
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return parseFloat(value); // Convert numeric strings to floats
        }
        return value; // Return other valid values as-is
      },
      from: (value: any) => value,
    },
  })
  thickenessMax: number;

  @CreateDateColumn()
  createDate: Date; // Automatically set to the current timestamp on creation

  @UpdateDateColumn()
  lastUpdated: Date; // Automatically updated to the current timestamp on each update
}
