import React, {useState} from 'react'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register(){
  /*Cada valor, por padrão, é recolhido utilizando o estado */
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  /*permite a navegação via JS */
  const history = useHistory()

  /*Função responsável pelo cadastro das ONGs */
  async function handleRegister(e){
    //"evita" a página de ser recarregada
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }
    try {
      const response = await api.post('ongs', data)
      alert(`Sua ID de acesso: ${response.data.id}`)
      history.push('/')
    } catch (err) {
      alert('Erro no cadastro, tente novamente.')
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type=""
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{width: 80}}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />

          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
