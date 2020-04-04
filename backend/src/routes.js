const express = require('express');

const PecaController = require('./controllers/PecaController');

const routes = express.Router();

routes.get('/pecas', PecaController.index);
routes.post('/pecas', PecaController.create);
routes.delete('/pecas/:codigo', PecaController.delete);

module.exports = routes;