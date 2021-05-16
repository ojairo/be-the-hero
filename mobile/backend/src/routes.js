const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create) //criar uma sessão para o usuário logado

routes.get('/ongs', OngController.index) //listar ongs
routes.post('/ongs', OngController.create) //cadastrar ongs

routes.get('/incidents', IncidentController.index)//criar casos
routes.post('/incidents', IncidentController.create)//criar casos
routes.delete('/incidents/:id', IncidentController.delete)//deletar casos

routes.get('/profile', ProfileController.index)//listar casos de uma ong específica

module.exports = routes
