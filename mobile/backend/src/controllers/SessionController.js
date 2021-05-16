const connection = require('../database/connection')

module.exports = {
  //criar uma sessão para o usuário logado
  async create(request, response){
    const {id} = request.body

    const ong = await connection('ongs')
    .where('id', id)
    .select('name').first()

    if(!ong){
      return response.status(400).json({error: 'No ONG found with this ID'})
    }

    return response.json(ong)
  },

  //deletar a sessão do usuário logado
}
