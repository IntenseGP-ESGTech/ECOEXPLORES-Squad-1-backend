require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Backend rodando.'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
