const express = require('express');
const router = express.Router();
const { register, login, loginWithGoogle } = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [school, teacher, parent, student]
 *                 description: Tipo de usuário
 *               cnpj:
 *                 type: string
 *                 description: CNPJ da escola (obrigatório se role=school)
 *               nomeInstituicao:
 *                 type: string
 *                 description: Nome da instituição (obrigatório se role=school)
 *               emailCorporativo:
 *                 type: string
 *                 format: email
 *                 description: Email corporativo (obrigatório se role=school)
 *               nomeProfessor:
 *                 type: string
 *                 description: Nome do professor (obrigatório se role=teacher)
 *               cpf:
 *                 type: string
 *                 description: CPF do professor (obrigatório se role=teacher)
 *               instituicao:
 *                 type: string
 *                 description: Instituição de ensino (obrigatório se role=teacher)
 *               emailProfessor:
 *                 type: string
 *                 format: email
 *                 description: Email do professor (obrigatório se role=teacher)
 *               nomeCompleto:
 *                 type: string
 *                 description: Nome completo do responsável (obrigatório se role=parent)
 *               cpfResponsavel:
 *                 type: string
 *                 description: CPF do responsável (obrigatório se role=parent)
 *               emailResponsavel:
 *                 type: string
 *                 format: email
 *                 description: Email do responsável (obrigatório se role=parent)
 *               nomeAluno:
 *                 type: string
 *                 description: Nome do aluno (obrigatório se role=student)
 *               cpfAluno:
 *                 type: string
 *                 description: CPF do aluno (obrigatório se role=student)
 *               matricula:
 *                 type: string
 *                 description: Matrícula do aluno (obrigatório se role=student)
 *               emailAluno:
 *                 type: string
 *                 format: email
 *                 description: Email do aluno (obrigatório se role=student)
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário (obrigatório para todos os roles)
 *           examples:
 *             escola:
 *               summary: Cadastro de escola
 *               value:
 *                 role: school
 *                 cnpj: "12345678000190"
 *                 nomeInstituicao: "Escola Exemplo"
 *                 emailCorporativo: "contato@escola.com"
 *                 password: "senha123"
 *             professor:
 *               summary: Cadastro de professor
 *               value:
 *                 role: teacher
 *                 nomeProfessor: "João Silva"
 *                 cpf: "12345678900"
 *                 instituicao: "Escola Exemplo"
 *                 emailProfessor: "joao@escola.com"
 *                 password: "senha123"
 *             aluno:
 *               summary: Cadastro de aluno
 *               value:
 *                 role: student
 *                 nomeAluno: "Maria Santos"
 *                 cpfAluno: "98765432100"
 *                 matricula: "2024001"
 *                 emailAluno: "maria@escola.com"
 *                 password: "senha123"
 *             responsavel:
 *               summary: Cadastro de responsável
 *               value:
 *                 role: parent
 *                 nomeCompleto: "Pedro Santos"
 *                 cpfResponsavel: "11122233344"
 *                 emailResponsavel: "pedro@email.com"
 *                 password: "senha123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Dados do usuário cadastrado
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       409:
 *         description: Email já cadastrado
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: CPF ou CNPJ do usuário (sem formatação)
 *                 example: "12345678900"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Dados do usuário
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       400:
 *         description: CPF/CNPJ e senha obrigatórios
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Autentica um usuário utilizando o token do Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - credential
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Token JWT retornado pelo Google Identity Services
 *     responses:
 *       200:
 *         description: Login via Google realizado com sucesso
 *       400:
 *         description: Token do Google ausente ou inválido
 *       401:
 *         description: Falha ao validar o token do Google
 */
router.post('/google', loginWithGoogle);

module.exports = router;
