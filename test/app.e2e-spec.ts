import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].id).toBe(1);
      });
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(1);
      });
  });


  it('/product (POST)', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({ id: 6, name: 'Producto 6', price: 13.99 })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(6);
      });
  });

  it('/product (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/product/1')
      .send({ name: 'Producto 1 nuevo'})
      .expect(200)      
      .expect((res) => {
        expect(res.body.name).toBe('Producto 1 nuevo');
      });
  });

  it('/product (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/product/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Producto 1');
      });
  });
});
