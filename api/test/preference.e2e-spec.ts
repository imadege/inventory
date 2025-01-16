import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Preference API (e2e)', () => {
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

  it('GET /preferences should return an empty array initially', async () => {
    const response = await request(app.getHttpServer()).get('/preferences');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /preferences should create a new preference', async () => {
    const newPreference = {
      material: 'Steel',
      form: 'Sheet',
      choice: 'Hot Rolled',
      grade: 'A36',
      dimensions: 'L=100 W=50',
      widthMin: 10,
      widthMax: 50,
    };

    const response = await request(app.getHttpServer())
      .post('/preferences')
      .send(newPreference);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newPreference);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /preferences should return the created preference', async () => {
    const response = await request(app.getHttpServer()).get('/preferences');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('material', 'Steel');
  });
});
