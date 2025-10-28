const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* 
    Utilizando memória para persistência de dados temporariamente
*/
let users = [];

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

  if (users.find(u => u[emailField] === userData[emailField]))
    return res.status(409).json({ message: 'Email já cadastrado' });

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.id = users.length + 1;

  users.push(userData);

  const token = jwt.sign({ id: userData.id, role: userData.role }, process.env.JWT_SECRET || 'segredo', {
    expiresIn: '1d',
  });

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

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1d' });

  res.json({ user, token });
};


module.exports = { register, login, users };
