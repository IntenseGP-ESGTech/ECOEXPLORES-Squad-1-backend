const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['school', 'teacher', 'parent', 'student'] },

  cnpj: { type: String },
  nomeInstituicao: { type: String },
  emailCorporativo: { type: String },

  nomeProfessor: { type: String },
  cpf: { type: String },
  instituicao: { type: String },
  emailProfessor: { type: String },

  nomeCompleto: { type: String },
  cpfResponsavel: { type: String },
  emailResponsavel: { type: String },

  nomeAluno: { type: String },
  cpfAluno: { type: String },
  matricula: { type: String },
  emailAluno: { type: String },

  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
