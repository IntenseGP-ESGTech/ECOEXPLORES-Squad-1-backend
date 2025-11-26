const { randomUUID } = require('crypto');

/**
 * In-memory storage for learning trails until a database is introduced.
 */
const learningTrails = [];
const allowedStatuses = ['rascunho', 'publicada'];

const normalizeModules = (modules = []) => {
  if (!Array.isArray(modules)) return [];
  return modules.map((module) => ({
    titulo: module.titulo || '',
    descricao: module.descricao || '',
    atividades: module.atividades || '',
    recursos: module.recursos || '',
    recompensas: module.recompensas || '',
  }));
};

const validateMandatoryFields = (data = {}) => {
  const requiredFields = [
    'codigoTrilha',
    'nomeTrilha',
    'descricaoTrilha',
    'publicoAlvo',
    'status',
    'nomeCriador',
  ];

  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length) {
    return `Campos obrigatórios ausentes: ${missingFields.join(', ')}`;
  }

  if (!allowedStatuses.includes(data.status.toLowerCase())) {
    return `Status inválido. Valores permitidos: ${allowedStatuses.join(', ')}`;
  }

  return null;
};

const ensureUniqueCode = (codigoTrilha, currentId = null) => {
  return learningTrails.some(
    (trail) => trail.codigoTrilha === codigoTrilha && trail.id !== currentId
  );
};

const listLearningTrails = (_req, res) => {
  res.json({ items: learningTrails });
};

const getLearningTrailById = (req, res) => {
  const { id } = req.params;
  const trail = learningTrails.find((t) => t.id === id);

  if (!trail) {
    return res.status(404).json({ message: 'Trilha não encontrada' });
  }

  res.json(trail);
};

const createLearningTrail = (req, res) => {
  const error = validateMandatoryFields(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const payload = {
    ...req.body,
    status: req.body.status.toLowerCase(),
  };

  if (ensureUniqueCode(payload.codigoTrilha)) {
    return res.status(409).json({ message: 'Código da trilha já utilizado' });
  }

  const now = new Date().toISOString();
  const trail = {
    id: randomUUID(),
    codigoTrilha: payload.codigoTrilha,
    nomeTrilha: payload.nomeTrilha,
    descricaoTrilha: payload.descricaoTrilha,
    publicoAlvo: payload.publicoAlvo,
    status: payload.status,
    nomeCriador: payload.nomeCriador,
    conteudo: normalizeModules(payload.conteudo),
    createdAt: now,
    updatedAt: now,
    ownerId: req.user?.id || null,
  };

  learningTrails.push(trail);
  res.status(201).json(trail);
};

const updateLearningTrail = (req, res) => {
  const { id } = req.params;
  const trailIndex = learningTrails.findIndex((t) => t.id === id);

  if (trailIndex === -1) {
    return res.status(404).json({ message: 'Trilha não encontrada' });
  }

  const incoming = req.body || {};
  const merged = { ...learningTrails[trailIndex], ...incoming };

  const error = validateMandatoryFields(merged);
  if (error) {
    return res.status(400).json({ message: error });
  }

  if (
    incoming.codigoTrilha &&
    ensureUniqueCode(incoming.codigoTrilha, id)
  ) {
    return res.status(409).json({ message: 'Código da trilha já utilizado' });
  }

  learningTrails[trailIndex] = {
    ...learningTrails[trailIndex],
    ...incoming,
    status: merged.status.toLowerCase(),
    conteudo: incoming.conteudo
      ? normalizeModules(incoming.conteudo)
      : learningTrails[trailIndex].conteudo,
    updatedAt: new Date().toISOString(),
  };

  res.json(learningTrails[trailIndex]);
};

const deleteLearningTrail = (req, res) => {
  const { id } = req.params;
  const trailIndex = learningTrails.findIndex((t) => t.id === id);

  if (trailIndex === -1) {
    return res.status(404).json({ message: 'Trilha não encontrada' });
  }

  learningTrails.splice(trailIndex, 1);
  res.status(204).send();
};

const resetLearningTrails = () => {
  learningTrails.splice(0, learningTrails.length);
};

module.exports = {
  listLearningTrails,
  getLearningTrailById,
  createLearningTrail,
  updateLearningTrail,
  deleteLearningTrail,
  learningTrails,
  resetLearningTrails,
};

