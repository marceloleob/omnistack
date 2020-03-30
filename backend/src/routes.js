const express = require('express');
const SessionController = require('./controllers/SessionController');
const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const routes = express.Router();

// Login
routes.post('/sessions', SessionController.create);

// ONGs
routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);

// Incidentes
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Dados de uma ONG
routes.get('/profile', ProfileController.index);

module.exports = routes;