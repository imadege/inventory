import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async (): Promise<TypeOrmModuleOptions> => {
          return {
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
          };
        },
      }),
      AppModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
}, 20000);

afterAll(async () => {
  await app.close();
});

describe('Inventory API (e2e)', () => {
  it('GET /inventory should return an empty array initially', async () => {
    const response = await request(app.getHttpServer()).get('/inventory');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /inventory should create a new inventory item', async () => {
    const newInventory = {
      productNumber: '12345',
      form: 'Sheet',
      choice: 'Hot Rolled',
      grade: 'A36',
      dimensions: 'L=100 W=50',
      quantity: 10,
      totalWeight: '100.5',
      location: 'Warehouse 1',
    };

    const response = await request(app.getHttpServer())
      .post('/inventory')
      .send(newInventory);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newInventory);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /inventory should return the created inventory item', async () => {
    const response = await request(app.getHttpServer()).get('/inventory');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('productNumber', '12345');
  });
});
