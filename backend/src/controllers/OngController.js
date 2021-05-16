const connection = require('../database/connection')
const { listenerCount } = require('events')
const generateUniqueId = require('../utils/ganerateUniqueId')

module.exports = {

  async index(request, response){
    const ongs = await connection('ongs').select('*')
    return response.json(ongs)
  },

  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body

    //criação do id da ong
    const id = generateUniqueId()

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({id})
  }
}
