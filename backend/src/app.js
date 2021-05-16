const express = require('express')
const cors = require('cors')
const {errors} = require('celebrate')
const routes = require('./routes')

const app = express()
app.use(cors(/*{
   origin: 'https://sitedaaplicacao.com.br'
  possui a função de determinar qual rota porderá acessar nossa aplicação quando estiver no ar

}*/))
app.use(express.json())
app.use(routes)

//rota é o caminho completo: '/contato'
//recurso é o nome dado ao destino, citado após a '/': 'contato'

//METODOS HTTP

//GET: buscar uma informação do backend
//POST: criar uma informação do backend
//PUT: alterar uma informação do backend
//DELETE: deletar uma informação do backend

/*
  TIPOS DE PARÂMETROS:

  Query Params: parâmetros nomeados enviados na rota após o "?" (filtros, paginação)
  Route Params: parâmetros utilizados para identificar recursos
  Request Body: corpo da requisição utilizado para criar ou alterar recursos
*/

app.use(errors())

module.exports = app
