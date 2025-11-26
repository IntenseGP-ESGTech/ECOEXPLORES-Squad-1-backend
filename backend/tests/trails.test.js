const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const trailRoutes = require('../src/routes/trails');
const { resetLearningTrails } = require('../src/controllers/trailController');

const app = express();
app.use(bodyParser.json());
app.use('/api/trilhas', trailRoutes);

const SECRET = 'test-secret';
process.env.JWT_SECRET = SECRET;

const getToken = () =>
  jwt.sign({ id: 'user-test', role: 'teacher' }, SECRET, { expiresIn: '1h' });

const authHeader = () => `Bearer ${getToken()}`;

describe('Trilhas CRUD', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    resetLearningTrails();
  });

  const samplePayload = () => ({
    codigoTrilha: 'TRL-001',
    nomeTrilha: 'Aventura Sustentável I',
    descricaoTrilha: 'Explorando conceitos básicos de sustentabilidade.',
    publicoAlvo: 'Fundamental II',
    status: 'rascunho',
    nomeCriador: 'professor-1',
    conteudo: [
      {
        titulo: 'Módulo 1',
        descricao: 'ODS na prática',
        atividades: 'Mapa mental e quizzes',
      },
    ],
  });

  it('should create a learning trail', async () => {
    const res = await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('codigoTrilha', 'TRL-001');
  });

  it('should list learning trails', async () => {
    await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    const res = await request(server)
      .get('/api/trilhas')
      .set('Authorization', authHeader());

    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(1);
  });

  it('should update a learning trail', async () => {
    const created = await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    const updated = await request(server)
      .put(`/api/trilhas/${created.body.id}`)
      .set('Authorization', authHeader())
      .send({ ...samplePayload(), nomeTrilha: 'Nova trilha' });

    expect(updated.status).toBe(200);
    expect(updated.body).toHaveProperty('nomeTrilha', 'Nova trilha');
  });

  it('should delete a learning trail', async () => {
    const created = await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    const deleted = await request(server)
      .delete(`/api/trilhas/${created.body.id}`)
      .set('Authorization', authHeader());

    expect(deleted.status).toBe(204);
  });

  it('should reject duplicated codes', async () => {
    await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    const res = await request(server)
      .post('/api/trilhas')
      .set('Authorization', authHeader())
      .send(samplePayload());

    expect(res.status).toBe(409);
  });
});

