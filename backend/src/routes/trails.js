const express = require('express');
const {
  listLearningTrails,
  getLearningTrailById,
  createLearningTrail,
  updateLearningTrail,
  deleteLearningTrail,
} = require('../controllers/trailController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Trilhas
 *   description: Gestão de trilhas de aprendizado
 */

/**
 * @swagger
 * /api/trilhas:
 *   get:
 *     summary: Lista todas as trilhas de aprendizado
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de trilhas
 */
router.get('/', listLearningTrails);

/**
 * @swagger
 * /api/trilhas/{id}:
 *   get:
 *     summary: Consulta detalhes de uma trilha específica
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da trilha
 *     responses:
 *       200:
 *         description: Dados da trilha
 *       404:
 *         description: Trilha não encontrada
 */
router.get('/:id', getLearningTrailById);

/**
 * @swagger
 * /api/trilhas:
 *   post:
 *     summary: Cria uma nova trilha de aprendizado
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trilha'
 *     responses:
 *       201:
 *         description: Trilha criada
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Código duplicado
 */
router.post('/', createLearningTrail);

/**
 * @swagger
 * /api/trilhas/{id}:
 *   put:
 *     summary: Atualiza uma trilha existente
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trilha'
 *     responses:
 *       200:
 *         description: Trilha atualizada
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Trilha não encontrada
 */
router.put('/:id', updateLearningTrail);

/**
 * @swagger
 * /api/trilhas/{id}:
 *   delete:
 *     summary: Remove uma trilha
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Trilha removida
 *       404:
 *         description: Trilha não encontrada
 */
router.delete('/:id', deleteLearningTrail);

module.exports = router;

