const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

/* 
    Utilizando memória para persistência de dados temporariamente
*/
let users = [];

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

const getEmailFromUser = (user = {}) =>
  user.email ||
  user.emailCorporativo ||
  user.emailProfessor ||
  user.emailResponsavel ||
  user.emailAluno;

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'segredo', {
    expiresIn: '1d',
  });

const register = async (req, res) => {
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: 'Role é obrigatória' });

  let userData = {};

  switch (role) {
    case 'school':
      const { cnpj, nomeInstituicao, emailCorporativo, password: passSchool } = req.body;
      if (!cnpj || !nomeInstituicao || !emailCorporativo || !passSchool)
        return res.status(400).json({ message: 'Todos os campos da escola são obrigatórios' });
      userData = { role, cnpj, nomeInstituicao, emailCorporativo, password: passSchool };
      break;

    case 'teacher':
      const { nomeProfessor, cpf, instituicao, emailProfessor, password: passTeacher } = req.body;
      if (!nomeProfessor || !cpf || !instituicao || !emailProfessor || !passTeacher)
        return res.status(400).json({ message: 'Todos os campos do professor são obrigatórios' });
      userData = { role, nomeProfessor, cpf, instituicao, emailProfessor, password: passTeacher };
      break;

    case 'parent':
      const { nomeCompleto, cpfResponsavel, emailResponsavel, password: passParent } = req.body;
      if (!nomeCompleto || !cpfResponsavel || !emailResponsavel || !passParent)
        return res.status(400).json({ message: 'Todos os campos do responsável são obrigatórios' });
      userData = { role, nomeCompleto, cpfResponsavel, emailResponsavel, password: passParent };
      break;

    case 'student':
      const { nomeAluno, cpfAluno, matricula, emailAluno, password: passStudent } = req.body;
      if (!nomeAluno || !cpfAluno || !matricula || !emailAluno || !passStudent)
        return res.status(400).json({ message: 'Todos os campos do aluno são obrigatórios' });
      userData = { role, nomeAluno, cpfAluno, matricula, emailAluno, password: passStudent };
      break;

    default:
      return res.status(400).json({ message: 'Role inválida' });
  }

  const emailField =
    role === 'school' ? 'emailCorporativo' :
    role === 'teacher' ? 'emailProfessor' :
    role === 'parent' ? 'emailResponsavel' :
    'emailAluno';

  if (users.find(u => getEmailFromUser(u) === userData[emailField]))
    return res.status(409).json({ message: 'Email já cadastrado' });

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.id = users.length + 1;
  userData.email = userData[emailField];

  users.push(userData);

  const token = generateToken(userData);

  res.status(201).json({ user: userData, token });
};

const login = async (req, res) => {
  const { identifier, password } = req.body; 
  if (!identifier || !password) return res.status(400).json({ message: 'CPF/CNPJ e senha obrigatórios' });

  const user = users.find(u =>
    u.cnpj === identifier ||
    u.cpf === identifier ||
    u.cpfAluno === identifier ||
    u.cpfResponsavel === identifier
  );

  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = generateToken(user);

  res.json({ user, token });
};

const loginWithGoogle = async (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({ message: 'GOOGLE_CLIENT_ID não configurado no backend' });
  }

  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Token do Google é obrigatório' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const sub = payload?.sub;

    if (!email || !sub) {
      return res.status(400).json({ message: 'Não foi possível validar os dados do Google.' });
    }

    let user =
      users.find(u => u.provider === 'google' && u.providerId === sub) ||
      users.find(u => getEmailFromUser(u) === email);

    if (!user) {
      user = {
        id: users.length + 1,
        role: 'google',
        email,
        name: payload?.name,
        picture: payload?.picture,
        provider: 'google',
        providerId: sub,
      };
      users.push(user);
    } else {
      user.provider = 'google';
      user.providerId = sub;
      user.email = getEmailFromUser(user) || email;
    }

    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    console.error('Erro ao validar token do Google', error);
    res.status(401).json({ message: 'Token do Google inválido' });
  }
};

module.exports = { register, login, loginWithGoogle, users };
