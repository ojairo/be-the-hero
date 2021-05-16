import axios from 'axios'

const api = axios.create({
  //enderço que se repete em toda a aplicação
  baseURL: 'http://localhost:3333',

})

export default api
