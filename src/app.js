require('dotenv').config(); // Carregue as variáveis de ambiente ANTES de qualquer outra coisa
const express = require('express');
const Routes = require('./routes/Routes');

const app = express();
app.use(express.json());

app.use('/api', Routes);

module.exports = app;