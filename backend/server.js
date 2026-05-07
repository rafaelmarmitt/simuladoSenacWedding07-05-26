require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const inscricaoRoutes = require('./routes/inscricaoRoutes');
const instrutorRoutes = require('./routes/instrutorRoutes');
const oficinaRoutes = require('./routes/oficinaRoutes');
const participanteRoutes = require('./routes/participanteRoutes');

const app = express();
const PORT = process.env.PORT || 3000

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/inscricoes', inscricaoRoutes);
app.use('/api/instrutores', instrutorRoutes);
app.use('/api/oficinas', oficinaRoutes);
app.use('/api/participantes', participanteRoutes);

// Servir o front
app.use(express.static(path.join(__dirname, '../frontend')));
// Rota de Fallback
app.use((req, res) => {
    res.sendFile('../frontend/index.html')
});

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} || http://localhost:${PORT}`);
});