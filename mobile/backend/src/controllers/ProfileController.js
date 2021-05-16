const connection = require('../database/connection')

module.exports = {
  /*método para listar casos específicos de uma ong */
  async index(request, response){
    /* pega id da ong logada */
    const ong_id = request.headers.authorization

    /*realiza a busca no DB buscando os casos que foram cadastrados pela ong logada */
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*')

    return response.json(incidents)
  }
}
