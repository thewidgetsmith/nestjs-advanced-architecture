import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@app/app.module';

describe('AlarmsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.register({ driver: 'in-memory' })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should GET /alarms returning an empty array', async () => {
    expect.hasAssertions();

    const response = await request(app.getHttpServer()).get('/alarms');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it('should POST /alarms returning new alarm data', async () => {
    expect.hasAssertions();

    const payload = { name: 'Test Alarm', severity: 'high' };
    const response = await request(app.getHttpServer()).post('/alarms').send(payload);

    const body = response.body;
    expect(response.status).toBe(201);
    expect(body.name).toBe(payload.name);
    expect(body.severity.value).toBe(payload.severity);
    expect(body.uuid).toBeDefined();
  });

  describe('full request workflow', () => {
    it('should create a new alarm and then get it', async () => {
      expect.hasAssertions();

      const created = await request(app.getHttpServer())
        .post('/alarms')
        .send({ name: 'Test Alarm', severity: 'high' });

      expect(created.status).toBe(201);

      const fetched = await request(app.getHttpServer()).get(`/alarms`);

      expect(fetched.status).toBe(200);
      expect(fetched.body[0].name).toBe(created.body.name);
      expect(fetched.body[0].severity).toStrictEqual(created.body.severity);
      expect(fetched.body[0].uuid).toBe(created.body.uuid);
    });
  });
});
