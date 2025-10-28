const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { register, login } = require('../src/controllers/authController');

const app = express();
app.use(bodyParser.json());

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

describe('Auth endpoints', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should register a student', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        role: 'student',
        nomeAluno: 'Test Student',
        cpfAluno: '11122233344',
        matricula: '20251027001',
        emailAluno: 'test@student.com',
        password: 'Senha123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('cpfAluno', '11122233344');
  });

  it('should login a student', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        identifier: '11122233344',
        password: 'Senha123!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should register a teacher', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        role: 'teacher',
        nomeProfessor: 'Prof Test',
        cpf: '12345678900',
        instituicao: 'Escola Test',
        emailProfessor: 'prof@test.com',
        password: 'ProfSenha123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('cpf', '12345678900');
  });

  it('should login a teacher', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        identifier: '12345678900',
        password: 'ProfSenha123!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should register a parent', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        role: 'parent',
        nomeCompleto: 'Pai Test',
        cpfResponsavel: '98765432100',
        emailResponsavel: 'pai@test.com',
        password: 'PaiSenha123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('cpfResponsavel', '98765432100');
  });

  it('should login a parent', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        identifier: '98765432100',
        password: 'PaiSenha123!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should register a school', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        role: 'school',
        cnpj: '12345678000199',
        nomeInstituicao: 'Escola Test',
        emailCorporativo: 'contato@escolatest.com',
        password: 'SchoolSenha123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('cnpj', '12345678000199');
  });

  it('should login a school', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        identifier: '12345678000199',
        password: 'SchoolSenha123!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

});
