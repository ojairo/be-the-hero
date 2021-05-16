const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async()=>{
    await connection.migrate.rollback() //zerar o banco de testes
    await connection.migrate.latest() //fazer as migrations
  })

  afterAll(async()=>{
    await connection.destroy()
  })

  it('should be abble to create a new ong', async() => {
    const response = await request(app)
    .post('/ongs')
    //.set('Authorization', <id_valido>) headers
    .send({
      name: "ONG_TEST",
      email: "contato@ongtest.com",
      whatsapp: "19900990099",
      city: "Camburizinho",
      uf: "SP"
    })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
