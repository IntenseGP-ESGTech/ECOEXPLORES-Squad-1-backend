const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = [];

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Dados incompletos' });

  if (users.find(u => u.email === email)) return res.status(409).json({ message: 'Email já cadastrado' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, name, email, password: hashed, role: role || 'student' };
  users.push(user);

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};

module.exports = { register, login };
