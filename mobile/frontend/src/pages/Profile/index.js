import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function Profile(){
  const [incidents, setIncidents] = useState([])

  const history = useHistory()
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')


  /*Utilizado quando queremos executar alguma função quando algoocorrer, seja no início da aplicação ou quando o valor do array for alterado, caso não for passado nenhum valor dentro do array, a função será executada apenas uma única vez*/
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])


  /*Funcção para deletar um caso */
  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })
      /*linha para "atualizar os casos da tela, ou seja, assim que um caso é deletado, ele já não aparece mais em tela" */
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar o caso, tente novamente.')
    }
  }

  /*Função para fazer o LogOut */
  function handleLogout(){
    localStorage.clear()
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to= "/incidents/new">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>

        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

          {/* Ao utilizar o onClick() sem uma arrow function no caso, o código dele seria executado assim que o mesmo aparecessem em tela, deletando todos os dados cadastrados */}

          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}

      </ul>
    </div>
  )
}
