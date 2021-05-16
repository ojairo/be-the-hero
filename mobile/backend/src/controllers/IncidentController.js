const connection = require('../database/connection')

module.exports = {
  //listar casos
  async index(request, response){

    const [count] = await connection('incidents').count()

    /* Limitar a quantidade de retornos de casos
    (Sistema de Paginação) */
    const {page = 1} = request.query //valor passado por parâmetro (valor passado pela rota após o '?')
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]); /* select utilizado para buscar apenas por determinados campos nas tabelas também ditas */

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },

  //criar casos
  async create(request, response){
    const {title, description, value} = request.body
    const ong_id = request.headers.authorization

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    return response.json({id})

  },

  //deletar casos
  async delete(request, response){
    const {id} = request.params //pegar o parâmetro passado pela rota
    const ong_id = request.headers.authorization //pegar id da ong logada

    /*Busca por uma caso específico (.where('nomedocampo', [valor_comparar]')) dentro da tabela, como irá retornar apenas um valor, pode-se acrescentar o first() para pegá-lo logo "de cara", não precisando criar uma array para o retorno, e sim, apenas um valor */
    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    /*verifica se a ong que está logada é a mesma que deseja deletar o caso. Pega a id da ong armazenada no banco de dados e compara com a id da ong que está logada*/

    /* Caso o valor dos parâmetros sejam diferentes, é apresentado um erro */
    if(incident.ong_id !== ong_id){
      //código 401 = 'não autorizado'
      return response.status(401).json({error: 'Operation not permitted'})
    }

    /* Caso a id da ong é a mesma id da ong que está logada, a operação é realizada*/
    await connection('incidents').where('id', id).delete()
    return response.status(204).send()
    //código 204 = 'sucesso, mas sem conteúdo para mostrar'

  }
}
